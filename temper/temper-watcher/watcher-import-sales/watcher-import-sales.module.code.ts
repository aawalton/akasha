import { upsertPage } from "@akasha/pages-access/upsert"
import { identityOf } from "@akasha/temper-addon-generators/identity-of-key"
import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import type { SalesPayload } from "@akasha/temper-capture-sales/sales-payload"
import { readFirstAccountWide } from "@akasha/temper-saved-variables/account-wide"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { asRecord } from "@akasha/utils-narrow/as-record"
import type { Json } from "@akasha/utils-narrow/json-value"
import { z } from "zod"
import { resolveAccountPageId } from "../watcher-account-page/watcher-account-page.module.code.ts"
import { log } from "../watcher-logging/watcher-logging.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

export const SALES_GLOBAL_NAME = "TemperSales_SavedVariables"

export const SALE_PAGE_TYPE_SLUG = "temper-sale"

export const SALE_SLUG_BASE = "sale"

export const MILLISECONDS_PER_SECOND = 1000

const SALE_ENTRY_SCHEMA = z
  .object({
    saleId: z.string().optional(),
    itemLink: z.string().optional(),
    itemName: z.string().optional(),
    itemId: z.number().optional(),
    quantity: z.number().optional(),
    price: z.number().optional(),
    tax: z.number().optional(),
    buyerName: z.string().optional(),
    guildName: z.string().optional(),
    soldAt: z.number().optional(),
  })
  .strict()

const SALES_ACCOUNT_WIDE_SCHEMA = z
  .object({
    version: z.number().optional(),
    displayName: z.string().optional(),
    sales: z.record(z.string(), SALE_ENTRY_SCHEMA).optional(),
  })
  .strict()

assertSchemaMatchesPayload<typeof SALES_ACCOUNT_WIDE_SCHEMA, SalesPayload>()

export interface SaleUpsert {
  readonly saleId: string
  readonly itemName: string
  readonly itemId?: number
  readonly quantity?: number
  readonly salePrice: number
  readonly tax: number
  readonly netPayout: number
  readonly guildName?: string
  readonly buyerName?: string
  readonly soldAt?: number
}

export interface SaleImportPlan {
  readonly actions: readonly SaleUpsert[]
}

export type SalePageUpsert = typeof upsertPage

export type ImportReport = (message: string) => void

export interface ImportSalesOptions {
  readonly userId?: string
  readonly upsert?: SalePageUpsert
  readonly report?: ImportReport
}

export function planSaleImport(content: string): SaleImportPlan {
  const root = parseLuaSavedVariablesFile(content, SALES_GLOBAL_NAME)
  const defaultTable = asRecord(root.Default)
  if (!defaultTable) return { actions: [] }

  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) return { actions: [] }

  const salesRecord = asRecord(accountWide.sales) ?? {}
  const actions: SaleUpsert[] = []
  for (const key of Object.keys(salesRecord)) {
    const parsed = SALE_ENTRY_SCHEMA.safeParse(salesRecord[key])
    if (!parsed.success) continue
    const entry = parsed.data
    if (entry.saleId === undefined || entry.saleId === "") continue

    const price = entry.price ?? 0
    const tax = entry.tax ?? 0
    actions.push({
      saleId: entry.saleId,
      itemName: entry.itemName ?? "",
      itemId: entry.itemId,
      quantity: entry.quantity,
      salePrice: price,
      tax,
      netPayout: price - tax,
      guildName: entry.guildName,
      buyerName: entry.buyerName,
      soldAt: entry.soldAt,
    })
  }
  return { actions }
}

export function saleSlug(saleId: string): string {
  const stem = identityOf(saleId)
  return stem === "" ? SALE_SLUG_BASE : `${SALE_SLUG_BASE}-${stem}`
}

export function saleSoldAtIso(soldAt: number): string {
  return new Date(soldAt * MILLISECONDS_PER_SECOND).toISOString()
}

export function salePageValues(userId: string, action: SaleUpsert): Record<string, Json> {
  return {
    userId,
    slug: saleSlug(action.saleId),
    accountPage: userId,
    saleId: action.saleId,
    title: action.itemName,
    itemName: action.itemName,
    salePrice: action.salePrice,
    tax: action.tax,
    netPayout: action.netPayout,
    ...(action.itemId !== undefined ? { itemId: String(action.itemId) } : {}),
    ...(action.quantity !== undefined ? { quantity: action.quantity } : {}),
    ...(action.guildName !== undefined ? { guildName: action.guildName } : {}),
    ...(action.buyerName !== undefined ? { buyerName: action.buyerName } : {}),
    ...(action.soldAt !== undefined ? { soldAt: saleSoldAtIso(action.soldAt) } : {}),
  }
}

export async function writeSaleImportPlan(
  plan: SaleImportPlan,
  supabase: SignedInReader,
  options: ImportSalesOptions = {}
): Promise<void> {
  if (plan.actions.length === 0) return

  const upsert = options.upsert ?? upsertPage
  const userId = await userIdFor(supabase, options.userId, "import these sales")

  await resolveAccountPageId(userId, upsert)

  for (const action of plan.actions) {
    await upsert({
      pageTypeSlug: SALE_PAGE_TYPE_SLUG,
      where: [
        { key: "accountPage", eq: userId },
        { key: "saleId", eq: action.saleId },
      ],
      set: salePageValues(userId, action),
      select: ["id"],
    })
  }
}

export async function runImportSales(
  content: string,
  supabase: SignedInReader,
  options: ImportSalesOptions = {}
): Promise<void> {
  const plan = planSaleImport(content)
  const report = options.report ?? log
  report(`Sales import: ${plan.actions.length} sale(s) captured.`)
  await writeSaleImportPlan(plan, supabase, options)
}
