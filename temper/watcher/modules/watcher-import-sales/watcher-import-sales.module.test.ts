import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  NO_ACCOUNT_WIDE_TABLE,
  NO_DEFAULT_TABLE,
  planSaleImport,
  runImportSales,
  type SaleImportPlan,
  type SalePageUpsert,
  type SaleUpsert,
  saleMissingWhy,
  salePageValues,
  saleSlug,
  saleSoldAtIso,
  UNREADABLE_SALES_TABLE,
  unreadableSaleWhy,
  writeSaleImportPlan,
} from "akasha/temper/watcher/modules/watcher-import-sales/watcher-import-sales.module.code.ts"
import type { SignedInReader } from "akasha/temper/watcher/modules/watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

interface UpsertCall {
  readonly pageTypeSlug: string
  readonly where: readonly unknown[]
  readonly set: Record<string, unknown>
}

const CAPTURE = `
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

const NO_DEFAULT = `TemperSales_SavedVariables = { ["Other"] = {} }`
const NO_ACCOUNT_WIDE = `TemperSales_SavedVariables = { ["Default"] = { ["@alan"] = {} } }`
const NO_SALES = captureOf("")
const SALES_NOT_A_TABLE = captureOf(`, ["sales"] = { "a", "b" }`)
const UNKNOWN_KEY = captureOfOneSale(
  `["saleId"] = "extra", ["itemName"] = "Ore", ["price"] = 1, ["tax"] = 0, ["listedAt"] = 5`
)
const NO_SALE_ID = captureOfOneSale(`["itemName"] = "Ore", ["price"] = 1, ["tax"] = 0`)
const EMPTY_SALE_ID = captureOfOneSale(
  `["saleId"] = "", ["itemName"] = "Ore", ["price"] = 1, ["tax"] = 0`
)
const NO_ITEM_NAME = captureOfOneSale(`["saleId"] = "s", ["price"] = 1, ["tax"] = 0`)
const NO_PRICE = captureOfOneSale(`["saleId"] = "s", ["itemName"] = "Ore", ["tax"] = 0`)
const NO_TAX = captureOfOneSale(`["saleId"] = "s", ["itemName"] = "Ore", ["price"] = 1`)

const SIGNED_IN: SignedInReader = {
  auth: { getUser: async () => ({ error: null, data: { user: { id: "user-1" } } }) },
}

const SIGNED_OUT: SignedInReader = {
  auth: { getUser: async () => ({ error: { message: "jwt expired" }, data: { user: null } }) },
}

async function addressOf(userId: string): Promise<string> {
  return `temper-account/${userId}`
}

function recordingUpsert(): { calls: UpsertCall[]; upsert: SalePageUpsert } {
  const calls: UpsertCall[] = []
  const upsert: SalePageUpsert = async (args) => {
    calls.push({ pageTypeSlug: args.pageTypeSlug, where: args.where, set: args.set })
    return asPage({ id: "page-1" })
  }
  return { calls, upsert }
}

test("every sale the capture holds becomes one action in the order the keys came in", () => {
  expect(planSaleImport(CAPTURE)).toEqual({
    actions: [
      {
        saleId: "Sale #7 / Guild Store!",
        itemName: "Rubedite Ore",
        itemId: 64489,
        quantity: 100,
        salePrice: 5000,
        tax: 250,
        netPayout: 4750,
        guildName: "Traders",
        buyerName: "@bob",
        soldAt: 1700000000,
      },
      {
        saleId: "bare",
        itemName: "Plain Ore",
        itemId: undefined,
        quantity: undefined,
        salePrice: 12,
        tax: 1,
        netPayout: 11,
        guildName: undefined,
        buyerName: undefined,
        soldAt: undefined,
      },
    ],
  })
})

test("a sale entry carrying a key the sale shape does not name refuses the import", () => {
  expect(() => planSaleImport(UNKNOWN_KEY)).toThrow(
    unreadableSaleWhy("only", '`the entry itself` Unrecognized key: "listedAt"')
  )
})

test("a sale entry with no sale id refuses the import", () => {
  expect(() => planSaleImport(NO_SALE_ID)).toThrow("the sale under `only` names no sale id")
})

test("a sale entry with an empty sale id refuses the import", () => {
  expect(() => planSaleImport(EMPTY_SALE_ID)).toThrow("the sale under `only` names no sale id")
})

test("a sale entry naming no item refuses rather than titling a page with nothing", () => {
  expect(() => planSaleImport(NO_ITEM_NAME)).toThrow(
    saleMissingWhy("only", "item name", "as a page titled with nothing")
  )
})

test("a sale entry naming no price refuses rather than writing a sale for no gold", () => {
  expect(() => planSaleImport(NO_PRICE)).toThrow(
    saleMissingWhy("only", "price", "as a sale that brought in no gold")
  )
})

test("a sale entry naming no tax refuses rather than writing a payout no tax came out of", () => {
  expect(() => planSaleImport(NO_TAX)).toThrow(
    saleMissingWhy("only", "tax", "with a payout no tax ever came out of")
  )
})

test("a capture with no Default table refuses rather than planning no sale", () => {
  expect(() => planSaleImport(NO_DEFAULT)).toThrow(NO_DEFAULT_TABLE)
})

test("a capture with no account-wide table refuses rather than planning no sale", () => {
  expect(() => planSaleImport(NO_ACCOUNT_WIDE)).toThrow(NO_ACCOUNT_WIDE_TABLE)
})

test("an account-wide table naming no sales at all plans no sale write", () => {
  expect(planSaleImport(NO_SALES)).toEqual({ actions: [] })
})

test("an account-wide table whose sales are no table of sales refuses the import", () => {
  expect(() => planSaleImport(SALES_NOT_A_TABLE)).toThrow(UNREADABLE_SALES_TABLE)
})

test("a sale id reduces to the slug the legacy importer wrote", () => {
  expect(saleSlug("Sale #7 / Guild Store!")).toBe("sale-sale-7-guild-store")
  expect(saleSlug("bare")).toBe("sale-bare")
  expect(saleSlug("  Mixed__CASE 42  ")).toBe("sale-mixed-case-42")
  expect(saleSlug("---a---b---")).toBe("sale-a-b")
  expect(saleSlug("ÜMLAUT")).toBe("sale-mlaut")
})

test("a sale id holding nothing a slug admits reduces to the bare sale slug", () => {
  expect(saleSlug("----")).toBe("sale")
  expect(saleSlug("")).toBe("sale")
})

test("a sold-at time counted in seconds reads as a UTC timestamp to the millisecond", () => {
  expect(saleSoldAtIso(1700000000)).toBe("2023-11-14T22:13:20.000Z")
})

test("a sale missing every optional field is written without those keys", () => {
  const action: SaleUpsert = {
    saleId: "bare",
    itemName: "",
    salePrice: 0,
    tax: 0,
    netPayout: 0,
  }
  expect(salePageValues("temper-account/test-account", action)).toEqual({
    slug: "sale-bare",
    accountPage: "temper-account/test-account",
    saleId: "bare",
    title: "",
    name: "",
    salePrice: 0,
    tax: 0,
    netPayout: 0,
  })
})

test("an item id reaches the page as text while a quantity reaches it as a number", () => {
  const action: SaleUpsert = {
    saleId: "abc",
    itemName: "Ore",
    itemId: 64489,
    quantity: 100,
    salePrice: 10,
    tax: 1,
    netPayout: 9,
    soldAt: 1700000000,
  }
  const values = salePageValues("temper-account/test-account", action)
  expect(values.itemId).toBe("64489")
  expect(values.quantity).toBe(100)
  expect(values.soldAt).toBe("2023-11-14T22:13:20.000Z")
})

test("the account page is written before the first sale page", async () => {
  const { calls, upsert } = recordingUpsert()
  const plan: SaleImportPlan = {
    actions: [
      { saleId: "one", itemName: "A", salePrice: 2, tax: 1, netPayout: 1 },
      { saleId: "two", itemName: "B", salePrice: 4, tax: 1, netPayout: 3 },
    ],
  }
  await writeSaleImportPlan(plan, SIGNED_IN, { userId: "user-1", upsert, addressOf })
  expect(calls.map((call) => call.pageTypeSlug)).toEqual([
    "temper-account",
    "temper-sale",
    "temper-sale",
  ])
})

test("a sale page is located by its account page and its sale id together", async () => {
  const { calls, upsert } = recordingUpsert()
  const plan: SaleImportPlan = {
    actions: [{ saleId: "one", itemName: "A", salePrice: 2, tax: 1, netPayout: 1 }],
  }
  await writeSaleImportPlan(plan, SIGNED_IN, { userId: "user-1", upsert, addressOf })
  expect(calls[1]?.where).toEqual([
    { key: "accountPage", eq: "temper-account/user-1" },
    { key: "saleId", eq: "one" },
  ])
})

test("an empty plan writes no page at all", async () => {
  const { calls, upsert } = recordingUpsert()
  await writeSaleImportPlan({ actions: [] }, SIGNED_OUT, { upsert })
  expect(calls).toEqual([])
})

test("a session naming no user refuses the write and names the reason the session gave", async () => {
  const { calls, upsert } = recordingUpsert()
  const plan: SaleImportPlan = {
    actions: [{ saleId: "one", itemName: "A", salePrice: 2, tax: 1, netPayout: 1 }],
  }
  await expect(writeSaleImportPlan(plan, SIGNED_OUT, { upsert })).rejects.toThrow(
    "no signed-in user to import these sales (jwt expired)"
  )
  expect(calls).toEqual([])
})

test("the caller's user id is taken over the one the session would answer", async () => {
  const { calls, upsert } = recordingUpsert()
  const plan: SaleImportPlan = {
    actions: [{ saleId: "one", itemName: "A", salePrice: 2, tax: 1, netPayout: 1 }],
  }
  await writeSaleImportPlan(plan, SIGNED_OUT, { userId: "stated-user", upsert, addressOf })
  expect(calls[1]?.set).toMatchObject({ accountPage: "temper-account/stated-user" })
})

test("the run reports how many sales the capture held", async () => {
  const { calls, upsert } = recordingUpsert()
  const lines: string[] = []
  await runImportSales(CAPTURE, SIGNED_IN, {
    userId: "user-1",
    upsert,
    addressOf,
    report: (message) => {
      lines.push(message)
    },
  })
  expect(lines).toEqual(["Sales import: 2 sale(s) captured."])
  expect(calls).toHaveLength(3)
})

test("a sale this build cannot read reports no count and writes nothing", async () => {
  const { calls, upsert } = recordingUpsert()
  const lines: string[] = []
  await expect(
    runImportSales(UNKNOWN_KEY, SIGNED_IN, {
      userId: "user-1",
      upsert,
      report: (message) => {
        lines.push(message)
      },
    })
  ).rejects.toThrow("does not match the sale shape")
  expect(lines).toEqual([])
  expect(calls).toEqual([])
})
