import { expect, test } from "bun:test"
import { asPage } from "@akasha/pages-core/page-types"
import type { SignedInReader } from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import {
  planSaleImport,
  runImportSales,
  type SaleImportPlan,
  type SalePageUpsert,
  type SaleUpsert,
  salePageValues,
  saleSlug,
  saleSoldAtIso,
  writeSaleImportPlan,
} from "./watcher-import-sales.module.code.ts"

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
                    },
                    ["c"] =
                    {
                        ["saleId"] = "",
                        ["itemName"] = "Dropped for empty saleId",
                    },
                    ["d"] =
                    {
                        ["itemName"] = "Dropped for missing saleId",
                    },
                    ["e"] =
                    {
                        ["saleId"] = "extra",
                        ["unknownKey"] = 1,
                    },
                    ["f"] =
                    {
                        ["saleId"] = "----",
                        ["itemName"] = "Only punctuation",
                        ["price"] = 10,
                        ["tax"] = 30,
                    },
                },
            },
        },
    },
}
`

const NO_DEFAULT = `TemperSales_SavedVariables = { ["Other"] = {} }`
const NO_ACCOUNT_WIDE = `TemperSales_SavedVariables = { ["Default"] = { ["@alan"] = {} } }`
const NO_SALES = `TemperSales_SavedVariables = { ["Default"] = { ["@alan"] = { ["$AccountWide"] = { ["version"] = 1 } } } }`

const SIGNED_IN: SignedInReader = {
  auth: { getUser: async () => ({ error: null, data: { user: { id: "user-1" } } }) },
}

const SIGNED_OUT: SignedInReader = {
  auth: { getUser: async () => ({ error: { message: "jwt expired" }, data: { user: null } }) },
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
        itemName: "",
        itemId: undefined,
        quantity: undefined,
        salePrice: 0,
        tax: 0,
        netPayout: 0,
        guildName: undefined,
        buyerName: undefined,
        soldAt: undefined,
      },
      {
        saleId: "----",
        itemName: "Only punctuation",
        itemId: undefined,
        quantity: undefined,
        salePrice: 10,
        tax: 30,
        netPayout: -20,
        guildName: undefined,
        buyerName: undefined,
        soldAt: undefined,
      },
    ],
  })
})

test("a sale entry carrying a key the sale shape does not name reaches no action", () => {
  const ids = planSaleImport(CAPTURE).actions.map((action) => action.saleId)
  expect(ids).not.toContain("extra")
})

test("a sale entry with an empty or a missing sale id reaches no action", () => {
  const names = planSaleImport(CAPTURE).actions.map((action) => action.itemName)
  expect(names).not.toContain("Dropped for empty saleId")
  expect(names).not.toContain("Dropped for missing saleId")
})

test("a capture with no Default table plans nothing", () => {
  expect(planSaleImport(NO_DEFAULT)).toEqual({ actions: [] })
})

test("a capture with no account-wide table plans nothing", () => {
  expect(planSaleImport(NO_ACCOUNT_WIDE)).toEqual({ actions: [] })
})

test("an account-wide table with no sales plans nothing", () => {
  expect(planSaleImport(NO_SALES)).toEqual({ actions: [] })
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
  expect(salePageValues("user-1", action)).toEqual({
    userId: "user-1",
    slug: "sale-bare",
    accountPage: "user-1",
    saleId: "bare",
    title: "",
    itemName: "",
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
  const values = salePageValues("user-1", action)
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
  await writeSaleImportPlan(plan, SIGNED_IN, { userId: "user-1", upsert })
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
  await writeSaleImportPlan(plan, SIGNED_IN, { userId: "user-1", upsert })
  expect(calls[1]?.where).toEqual([
    { key: "accountPage", eq: "user-1" },
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
  await writeSaleImportPlan(plan, SIGNED_OUT, { userId: "stated-user", upsert })
  expect(calls[1]?.set).toMatchObject({ accountPage: "stated-user", userId: "stated-user" })
})

test("the run reports how many sales the capture held", async () => {
  const { calls, upsert } = recordingUpsert()
  const lines: string[] = []
  await runImportSales(CAPTURE, SIGNED_IN, {
    userId: "user-1",
    upsert,
    report: (message) => {
      lines.push(message)
    },
  })
  expect(lines).toEqual(["Sales import: 3 sale(s) captured."])
  expect(calls).toHaveLength(4)
})
