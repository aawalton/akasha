import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  type FileWriteDeps,
  upsertFilePage,
} from "akasha/page/access/modules/file-write/file-write.module.code.ts"
import { narrowedFrom } from "akasha/page/access/modules/file-write-narrow/file-write-narrow.module.code.ts"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Asked,
  asking,
  type Query,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  answering,
  type Serving,
  WRITE_AT,
} from "akasha/page/service/modules/page-serving/page-serving.module.code.ts"
import type {
  Put,
  Wrote,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { narrows } from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"
import type {
  GuildRead,
  SaleGuild,
  SalePageUpsert,
  SaleUpsert,
} from "akasha/temper/watcher/modules/watcher-import-sales/watcher-import-sales.module.code.ts"
import type { SignedInReader } from "akasha/temper/watcher/modules/watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

interface UpsertCall {
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

const ROOT = rootOf(import.meta.dir)

const HELD_BACK = { commit: null, wrote: [], took: [] }

export const TRADERS_PAGE_PATH =
  "temper/player/holdings/temper-guild/pages/na-megaserver-traders.temper-guild.ts"

export const TRADERS_PAGE = `import type { TemperGuild } from "akasha/temper/player/holdings/temper-guild/temper-guild.page-type.types.ts"

export const naMegaserverTraders = {
  type: "page-type/temper-guild",
  slug: "na-megaserver-traders",
  title: "Traders",
  guildId: 866125,
  worldName: "NA Megaserver",
} as const satisfies TemperGuild
`

export const RUBEDITE_PAGE_PATH =
  "temper/player/holdings/temper-sale/pages/sale-sale-7-guild-store.temper-sale.ts"

export const RUBEDITE_PAGE = `import type { TemperSale } from "akasha/temper/player/holdings/temper-sale/temper-sale.page-type.types.ts"

export const saleSale7GuildStore = {
  type: "page-type/temper-sale",
  slug: "sale-sale-7-guild-store",
  title: "Rubedite Ore",
  accountPage: "temper-account/user-1",
  saleId: "Sale #7 / Guild Store!",
  salePrice: 5000,
  tax: 250,
  netPayout: 4750,
  name: "Rubedite Ore",
  itemId: 64489,
  quantity: 100,
  buyerName: "@bob",
  soldAt: "2023-11-14T22:13:20.000Z",
  guild: "temper-guild/na-megaserver-traders",
} as const satisfies TemperSale
`

interface PageServiceWorld {
  readonly puts: readonly Put[]
  readonly upsert: SalePageUpsert
  readonly read: GuildRead
}

export function pageServiceWorld(): PageServiceWorld {
  const puts: Put[] = []
  const landed: { readonly pageTypeSlug: string; readonly values: Value }[] = []
  const serving: Serving = {
    root: ROOT,
    writer: {
      writing: (asked) => {
        puts.push(...(asked.puts ?? []))
        return Promise.resolve(HELD_BACK)
      },
      alone: (act) => act(),
    },
  }
  const ask = async (query: Query): Promise<Asked> => {
    const held = asking(ROOT, query)
    if ("refused" in held) return held
    const made = landed
      .filter((one) => one.pageTypeSlug === query.pageTypeSlug && narrows(one.values, query.where))
      .map((one) => one.values)
    const rows = [...held.rows, ...made]
    return { rows, n: rows.length }
  }
  const deps: FileWriteDeps = {
    ask,
    read: async () => ({ refused: "a sale import reads no body" }),
    write: async (writing) => {
      const request = new Request(`http://workstation${WRITE_AT}`, {
        method: "POST",
        body: JSON.stringify(writing),
      })
      const said = (await (await answering(serving, request)).json()) as Wrote
      if ("refused" in said) return said
      for (const one of writing.pages ?? []) {
        const values = { ...one.values, slug: one.slug, id: `landed-${landed.length}` }
        landed.push({ pageTypeSlug: one.pageTypeSlug, values })
      }
      return said
    },
  }
  const upsert: SalePageUpsert = async (args) =>
    (await upsertFilePage(args, "upsertPage", deps)).page
  const read: GuildRead = async (args) => {
    const narrowed = narrowedFrom(args.where ?? [])
    if ("refused" in narrowed) throw new Error(narrowed.refused)
    if (args.pageTypeSlug === undefined) throw new Error("a guild read names its page type")
    const asked = await ask({ pageTypeSlug: args.pageTypeSlug, where: narrowed.where })
    if ("refused" in asked) throw new Error(asked.refused)
    return { rows: asked.rows.map((row) => asPage(row)), nextCursor: null, count: null }
  }
  return { puts, upsert, read }
}
