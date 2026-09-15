import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { upsertPage } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import { slugOf } from "akasha/page/naming/folding/modules/slug-of/slug-of.module.code.ts"
import type { SalesPayload } from "akasha/temper/capture-sale/modules/sales-payload/sales-payload.module.code.ts"
import { assertSchemaMatchesPayload } from "akasha/temper/modules/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import { readFirstAccountWide } from "akasha/temper/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import { resolveAccountPageId } from "akasha/temper/watcher/modules/watcher-account-page/watcher-account-page.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "akasha/temper/watcher/modules/watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import { z } from "zod"

const SALES_GLOBAL_NAME = "TemperSales_SavedVariables"

const SALE_PAGE_TYPE_SLUG = "temper-sale"

const SALE_SLUG_BASE = "sale"

const MILLISECONDS_PER_SECOND = 1000

export const NO_DEFAULT_TABLE =
  "the sales capture holds no Default table, so it is refused rather than read as an account that sold nothing"

export const NO_ACCOUNT_WIDE_TABLE =
  "no account in the sales capture carries an account-wide table, so it is refused rather than read as an account that sold nothing"

export const UNREADABLE_SALES_TABLE =
  "the sales capture holds a sales value that is no table of sales, so it is refused rather than read as an account that sold nothing"

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

function saidWrong(
  issues: readonly { readonly path: readonly PropertyKey[]; readonly message: string }[]
): string {
  return issues
    .map((issue) => `\`${issue.path.join(".") || "the entry itself"}\` ${issue.message}`)
    .join("; ")
}

export function unreadableSaleWhy(key: string, wrong: string): string {
  return `the sale under \`${key}\` does not match the sale shape, so it is refused rather than left out of a count that would report every other sale as all of them: ${wrong}`
}

export function saleMissingWhy(key: string, missing: string, rather: string): string {
  return `the sale under \`${key}\` names no ${missing}, so it is refused rather than written ${rather}`
}

export function planSaleImport(content: string): SaleImportPlan {
  const root = parseLuaSavedVariablesFile(content, SALES_GLOBAL_NAME)
  const defaultTable = asRecord(root.Default)
  if (!defaultTable) throw new Error(NO_DEFAULT_TABLE)

  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) throw new Error(NO_ACCOUNT_WIDE_TABLE)

  if (accountWide.sales == null) return { actions: [] }
  const salesRecord = asRecord(accountWide.sales)
  if (!salesRecord) throw new Error(UNREADABLE_SALES_TABLE)

  const actions: SaleUpsert[] = []
  for (const key of Object.keys(salesRecord)) {
    const parsed = SALE_ENTRY_SCHEMA.safeParse(salesRecord[key])
    if (!parsed.success) throw new Error(unreadableSaleWhy(key, saidWrong(parsed.error.issues)))
    const entry = parsed.data
    if (entry.saleId === undefined || entry.saleId === "") {
      throw new Error(
        saleMissingWhy(key, "sale id", "over a page no later capture could find again")
      )
    }
    if (entry.itemName === undefined) {
      throw new Error(saleMissingWhy(key, "item name", "as a page titled with nothing"))
    }
    if (entry.price === undefined) {
      throw new Error(saleMissingWhy(key, "price", "as a sale that brought in no gold"))
    }
    if (entry.tax === undefined) {
      throw new Error(saleMissingWhy(key, "tax", "with a payout no tax ever came out of"))
    }

    actions.push({
      saleId: entry.saleId,
      itemName: entry.itemName,
      itemId: entry.itemId,
      quantity: entry.quantity,
      salePrice: entry.price,
      tax: entry.tax,
      netPayout: entry.price - entry.tax,
      guildName: entry.guildName,
      buyerName: entry.buyerName,
      soldAt: entry.soldAt,
    })
  }
  return { actions }
}

export function saleSlug(saleId: string): string {
  const stem = slugOf(saleId)
  return stem === "" ? SALE_SLUG_BASE : `${SALE_SLUG_BASE}-${stem}`
}

export function saleSoldAtIso(soldAt: number): string {
  return new Date(soldAt * MILLISECONDS_PER_SECOND).toISOString()
}

export function salePageValues(userId: string, action: SaleUpsert): Record<string, Json> {
  return {
    slug: saleSlug(action.saleId),
    accountPage: userId,
    saleId: action.saleId,
    title: action.itemName,
    name: action.itemName,
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
