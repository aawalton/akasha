import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type {
  GuildRead,
  SaleGuild,
  SalePageUpsert,
  SaleUpsert,
} from "akasha/temper/watcher/modules/watcher-import-sales/watcher-import-sales.module.code.ts"
import type { SignedInReader } from "akasha/temper/watcher/modules/watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

export interface UpsertCall {
  readonly pageTypeSlug: string
  readonly where: readonly unknown[]
  readonly set: Record<string, unknown>
}

export const CAPTURE = `
TemperSales_SavedVariables =
{
    ["Default"] =
    {
        ["@alan"] =
        {
            ["$AccountWide"] =
            {
                ["version"] = 1,
                ["displayName"] = "@alan",
                ["sales"] =
                {
                    ["a"] =
                    {
                        ["saleId"] = "Sale #7 / Guild Store!",
                        ["itemLink"] = "|H1:item:64489:30:1:0:0|h|h",
                        ["itemName"] = "Rubedite Ore",
                        ["itemId"] = 64489,
                        ["quantity"] = 100,
                        ["price"] = 5000,
                        ["tax"] = 250,
                        ["buyerName"] = "@bob",
                        ["guildName"] = "Traders",
                        ["guildId"] = 866125,
                        ["worldName"] = "NA Megaserver",
                        ["soldAt"] = 1700000000,
                    },
                    ["b"] =
                    {
                        ["saleId"] = "bare",
                        ["itemName"] = "Plain Ore",
                        ["price"] = 12,
                        ["tax"] = 1,
                    },
                },
            },
        },
    },
}
`

function captureOf(accountWideTail: string): string {
  return `TemperSales_SavedVariables = { ["Default"] = { ["@alan"] = { ["$AccountWide"] = { ["version"] = 1, ["displayName"] = "@alan"${accountWideTail} } } } }`
}

function captureOfOneSale(fields: string): string {
  return captureOf(`, ["sales"] = { ["only"] = { ${fields} } }`)
}

const PRICED = `["saleId"] = "s", ["itemName"] = "Ore", ["price"] = 1, ["tax"] = 0`

export const NO_DEFAULT = `TemperSales_SavedVariables = { ["Other"] = {} }`
export const NO_ACCOUNT_WIDE = `TemperSales_SavedVariables = { ["Default"] = { ["@alan"] = {} } }`
export const NO_SALES = captureOf("")
export const SALES_NOT_A_TABLE = captureOf(`, ["sales"] = { "a", "b" }`)
export const UNKNOWN_KEY = captureOfOneSale(
  `["saleId"] = "extra", ["itemName"] = "Ore", ["price"] = 1, ["tax"] = 0, ["listedAt"] = 5`
)
export const NO_SALE_ID = captureOfOneSale(`["itemName"] = "Ore", ["price"] = 1, ["tax"] = 0`)
export const EMPTY_SALE_ID = captureOfOneSale(
  `["saleId"] = "", ["itemName"] = "Ore", ["price"] = 1, ["tax"] = 0`
)
export const NO_ITEM_NAME = captureOfOneSale(`["saleId"] = "s", ["price"] = 1, ["tax"] = 0`)
export const NO_PRICE = captureOfOneSale(`["saleId"] = "s", ["itemName"] = "Ore", ["tax"] = 0`)
export const NO_TAX = captureOfOneSale(`["saleId"] = "s", ["itemName"] = "Ore", ["price"] = 1`)
export const GUILD_NO_ID = captureOfOneSale(
  `${PRICED}, ["guildName"] = "Traders", ["worldName"] = "NA Megaserver"`
)
export const GUILD_NO_WORLD = captureOfOneSale(
  `${PRICED}, ["guildName"] = "Traders", ["guildId"] = 7`
)
export const GUILD_EMPTY_NAME = captureOfOneSale(
  `${PRICED}, ["guildName"] = "", ["guildId"] = 7, ["worldName"] = "NA Megaserver"`
)

export const TRADERS: SaleGuild = {
  guildName: "Traders",
  guildId: 866125,
  worldName: "NA Megaserver",
}

export const TRADERS_SLUG = "na-megaserver-traders"

export const TRADERS_ADDRESS = "temper-guild/na-megaserver-traders"

export const SIGNED_IN: SignedInReader = {
  auth: { getUser: async () => ({ error: null, data: { user: { id: "user-1" } } }) },
}

export const SIGNED_OUT: SignedInReader = {
  auth: { getUser: async () => ({ error: { message: "jwt expired" }, data: { user: null } }) },
}

export async function addressOf(userId: string): Promise<string> {
  return `temper-account/${userId}`
}

export function recordingUpsert(): { calls: UpsertCall[]; upsert: SalePageUpsert } {
  const calls: UpsertCall[] = []
  const upsert: SalePageUpsert = async (args) => {
    calls.push({ pageTypeSlug: args.pageTypeSlug, where: args.where, set: args.set })
    return asPage({ id: "page-1", slug: args.set.slug ?? null })
  }
  return { calls, upsert }
}

export function readingGuilds(guildIds: Readonly<Record<string, number>>): {
  asked: string[]
  read: GuildRead
} {
  const asked: string[] = []
  const read: GuildRead = async (args) => {
    asked.push(JSON.stringify(args.where))
    const found = (args.where ?? []).flatMap((one) =>
      "eq" in one && one.key === "slug" && typeof one.eq === "string" && one.eq in guildIds
        ? [asPage({ slug: one.eq, guildId: guildIds[one.eq] })]
        : []
    )
    return { rows: found, nextCursor: null, count: null }
  }
  return { asked, read }
}

export function saleOf(saleId: string, guild?: SaleGuild): SaleUpsert {
  return { saleId, itemName: "A", salePrice: 2, tax: 1, netPayout: 1, guild }
}
