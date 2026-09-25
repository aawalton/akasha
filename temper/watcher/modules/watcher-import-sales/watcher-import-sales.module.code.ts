import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { upsertPage } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import { slugOf } from "akasha/page/naming/folding/modules/slug-of/slug-of.module.code.ts"
import type { SalesPayload } from "akasha/temper/capture/sale/modules/sales-payload/sales-payload.module.code.ts"
import { readFirstAccountWide } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import { assertSchemaMatchesPayload } from "akasha/temper/modules/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import { accountAddressOf } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { resolveAccountPageId } from "akasha/temper/watcher/modules/watcher-account-page/watcher-account-page.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "akasha/temper/watcher/modules/watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import { z } from "zod"

const SALES_GLOBAL_NAME = "TemperSales_SavedVariables"

const SALE_PAGE_TYPE_SLUG = "temper-sale"

const GUILD_PAGE_TYPE_SLUG = "temper-guild"

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
    guildId: z.number().optional(),
    worldName: z.string().optional(),
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

export interface SaleGuild {
  readonly guildName: string
  readonly guildId: number
  readonly worldName: string
}

export interface SaleUpsert {
  readonly saleId: string
  readonly itemName: string
  readonly itemId?: number
  readonly quantity?: number
  readonly salePrice: number
  readonly tax: number
  readonly netPayout: number
  readonly guild?: SaleGuild
  readonly buyerName?: string
  readonly soldAt?: number
}

export interface SaleImportPlan {
  readonly actions: readonly SaleUpsert[]
}

export type SalePageUpsert = typeof upsertPage

export type GuildRead = typeof getPages

export type ImportReport = (message: string) => void

export type AccountAddressOf = (userId: string) => Promise<string>

export interface ImportSalesOptions {
  readonly userId?: string
  readonly upsert?: SalePageUpsert
  readonly read?: GuildRead
  readonly report?: ImportReport
  readonly addressOf?: AccountAddressOf
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

export function guildSlug(worldName: string, guildName: string): string {
  return slugOf(`${worldName} ${guildName}`)
}

export function guildAddress(slug: string): string {
  return `${GUILD_PAGE_TYPE_SLUG}/${slug}`
}

export function guildIdMismatchWhy(slug: string, held: Json | undefined, captured: number): string {
  return `the guild \`${slug}\` has guild id ${JSON.stringify(held ?? null)} and a sale names guild id ${captured} under the same megaserver and name, so the import is refused rather than joining two guilds on one page`
}

export function guildNotBackWhy(slug: string, back: Json | undefined): string {
  return `the guild page written as \`${slug}\` came back as ${JSON.stringify(back ?? null)}, so no sale is written naming it`
}

function saleGuildOf(key: string, entry: z.infer<typeof SALE_ENTRY_SCHEMA>): SaleGuild | undefined {
  if (entry.guildName === undefined) return undefined
  if (slugOf(entry.guildName) === "") {
    throw new Error(saleMissingWhy(key, "guild name a slug admits", "against a guild with no page"))
  }
  if (entry.guildId === undefined) {
    throw new Error(
      saleMissingWhy(key, "guild id", "against a guild a later capture could not tell apart")
    )
  }
  if (entry.worldName === undefined || slugOf(entry.worldName) === "") {
    throw new Error(saleMissingWhy(key, "megaserver", "against a guild on no megaserver"))
  }
  return { guildName: entry.guildName, guildId: entry.guildId, worldName: entry.worldName }
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
      guild: saleGuildOf(key, entry),
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

export function guildPageValues(guild: SaleGuild): Record<string, Json> {
  return {
    slug: guildSlug(guild.worldName, guild.guildName),
    title: guild.guildName,
    guildId: guild.guildId,
    worldName: guild.worldName,
  }
}

export function salePageValues(
  accountPage: string,
  action: SaleUpsert,
  guild?: string
): Record<string, Json> {
  return {
    slug: saleSlug(action.saleId),
    accountPage,
    saleId: action.saleId,
    title: action.itemName,
    name: action.itemName,
    salePrice: action.salePrice,
    tax: action.tax,
    netPayout: action.netPayout,
    ...(action.itemId !== undefined ? { itemId: action.itemId } : {}),
    ...(action.quantity !== undefined ? { quantity: action.quantity } : {}),
    ...(guild !== undefined ? { guild } : {}),
    ...(action.buyerName !== undefined ? { buyerName: action.buyerName } : {}),
    ...(action.soldAt !== undefined ? { soldAt: saleSoldAtIso(action.soldAt) } : {}),
  }
}

async function findOrMakeGuild(
  guild: SaleGuild,
  upsert: SalePageUpsert,
  read: GuildRead
): Promise<string> {
  const slug = guildSlug(guild.worldName, guild.guildName)
  const { rows } = await read({
    pageTypeSlug: GUILD_PAGE_TYPE_SLUG,
    where: [{ key: "slug", eq: slug }],
    select: ["slug", "guildId"],
    limit: 1,
  })
  const found = rows[0]
  if (found !== undefined) {
    if (found.guildId !== guild.guildId) {
      throw new Error(guildIdMismatchWhy(slug, found.guildId, guild.guildId))
    }
    return guildAddress(slug)
  }
  const made = await upsert({
    pageTypeSlug: GUILD_PAGE_TYPE_SLUG,
    where: [{ key: "slug", eq: slug }],
    set: guildPageValues(guild),
    select: ["slug"],
  })
  if (made.slug !== slug) throw new Error(guildNotBackWhy(slug, made.slug))
  return guildAddress(slug)
}

async function guildAddresses(
  plan: SaleImportPlan,
  upsert: SalePageUpsert,
  read: GuildRead
): Promise<ReadonlyMap<string, string>> {
  const idBySlug = new Map<string, number>()
  const addressBySlug = new Map<string, string>()
  for (const action of plan.actions) {
    if (action.guild === undefined) continue
    const slug = guildSlug(action.guild.worldName, action.guild.guildName)
    const seen = idBySlug.get(slug)
    if (seen !== undefined) {
      if (seen !== action.guild.guildId) {
        throw new Error(guildIdMismatchWhy(slug, seen, action.guild.guildId))
      }
      continue
    }
    idBySlug.set(slug, action.guild.guildId)
    addressBySlug.set(slug, await findOrMakeGuild(action.guild, upsert, read))
  }
  return addressBySlug
}

export async function writeSaleImportPlan(
  plan: SaleImportPlan,
  supabase: SignedInReader,
  options: ImportSalesOptions = {}
): Promise<void> {
  if (plan.actions.length === 0) return

  const upsert = options.upsert ?? upsertPage
  const read = options.read ?? getPages
  const userId = await userIdFor(supabase, options.userId, "import these sales")

  await resolveAccountPageId(userId, upsert)
  const accountPage = await (options.addressOf ?? accountAddressOf)(userId)
  const guilds = await guildAddresses(plan, upsert, read)

  for (const action of plan.actions) {
    const guild =
      action.guild === undefined
        ? undefined
        : guilds.get(guildSlug(action.guild.worldName, action.guild.guildName))
    await upsert({
      pageTypeSlug: SALE_PAGE_TYPE_SLUG,
      where: [
        { key: "accountPage", eq: accountPage },
        { key: "saleId", eq: action.saleId },
      ],
      set: salePageValues(accountPage, action, guild),
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
