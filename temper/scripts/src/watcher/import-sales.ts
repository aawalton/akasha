import { upsertPage } from "@shared/pages-access/upsert"
import type { SupabaseServiceRoleClient } from "../../../../shared/supabase-server/src/service-role"
import { asRecord } from "../../../../shared/utils-narrow/src/as-record"
import { assertSchemaMatchesPayload } from "@temper/shared-capture-host/assert-schema-matches-payload"
import { readFirstAccountWide } from "../../../shared-saved-variables/src/saved-variables-account-wide"
import type { SalesPayload } from "@temper/shared-capture-sales-core/types"
import { parseLuaSavedVariablesFile } from "@temper/shared-saved-variables/lua-parser"
import { z } from "zod"

const saleEntrySchema = z
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

const salesAccountWideSchema = z
  .object({
    version: z.number().optional(),
    displayName: z.string().optional(),
    sales: z.record(z.string(), saleEntrySchema).optional(),
  })
  .strict()

assertSchemaMatchesPayload<typeof salesAccountWideSchema, SalesPayload>()

interface SaleUpsert {
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

interface SaleImportPlan {
  readonly actions: readonly SaleUpsert[]
}

export function planSaleImport(content: string): SaleImportPlan {
  const root = parseLuaSavedVariablesFile(content, "TemperSales_SavedVariables")
  const defaultTable = asRecord(root.Default)
  if (!defaultTable) return { actions: [] }

  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) return { actions: [] }

  const salesRecord = asRecord(accountWide.sales) ?? {}
  const actions: SaleUpsert[] = []
  for (const key of Object.keys(salesRecord)) {
    const parsed = saleEntrySchema.safeParse(salesRecord[key])
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

function saleSlug(saleId: string): string {
  const cleaned = saleId
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return cleaned === "" ? "sale" : `sale-${cleaned}`
}

async function resolveAccountPageId(userId: string): Promise<string> {
  const row = await upsertPage({
    pageTypeSlug: "temper-account",
    where: [{ key: "title", eq: userId }],
    set: { userId, title: userId },
    select: ["id"],
  })
  const id = row.id
  if (typeof id !== "string") {
    throw new Error("runImportSales: page_upsert(temper-account) returned no id")
  }
  return id
}

async function executeSaleImportPlan(
  plan: SaleImportPlan,
  supabase: SupabaseServiceRoleClient,
  options: { userId?: string }
): Promise<void> {
  if (plan.actions.length === 0) return

  let userId = options.userId
  if (userId == null) {
    const userResult = await supabase.auth.getUser()
    if (userResult.error || !userResult.data.user) {
      throw new Error(
        `runImportSales: not authenticated (${userResult.error?.message ?? "no user"})`
      )
    }
    userId = userResult.data.user.id
  }

  await resolveAccountPageId(userId)

  for (const action of plan.actions) {
    await upsertPage({
      pageTypeSlug: "temper-sale",
      where: [
        { key: "accountPage", eq: userId },
        { key: "saleId", eq: action.saleId },
      ],
      set: {
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
        ...(action.soldAt !== undefined
          ? { soldAt: new Date(action.soldAt * 1000).toISOString() }
          : {}),
      },
      select: ["id"],
    })
  }
}

export async function runImportSales(
  content: string,
  supabase: SupabaseServiceRoleClient,
  options: { userId?: string } = {}
): Promise<void> {
  const plan = planSaleImport(content)
  console.log(`Sales import: ${plan.actions.length} sale(s) captured.`)
  await executeSaleImportPlan(plan, supabase, options)
}
