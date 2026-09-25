import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  guildAddress,
  guildIdMismatchWhy,
  guildNotBackWhy,
  guildPageValues,
  guildSlug,
  NO_ACCOUNT_WIDE_TABLE,
  NO_DEFAULT_TABLE,
  planSaleImport,
  runImportSales,
  type SaleGuild,
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
import {
  addressOf,
  CAPTURE,
  EMPTY_SALE_ID,
  GUILD_EMPTY_NAME,
  GUILD_NO_ID,
  GUILD_NO_WORLD,
  NO_ACCOUNT_WIDE,
  NO_DEFAULT,
  NO_ITEM_NAME,
  NO_PRICE,
  NO_SALE_ID,
  NO_SALES,
  NO_TAX,
  readingGuilds,
  recordingUpsert,
  SALES_NOT_A_TABLE,
  SIGNED_IN,
  SIGNED_OUT,
  saleOf,
  TRADERS,
  TRADERS_ADDRESS,
  TRADERS_SLUG,
  UNKNOWN_KEY,
} from "akasha/temper/watcher/modules/watcher-import-sales/watcher-import-sales.module.test-fixtures.ts"

const USER = { userId: "user-1", addressOf } as const

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
        guild: TRADERS,
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
        guild: undefined,
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

test("a sale entry with no sale id or an empty one refuses the import", () => {
  expect(() => planSaleImport(NO_SALE_ID)).toThrow("the sale under `only` names no sale id")
  expect(() => planSaleImport(EMPTY_SALE_ID)).toThrow("the sale under `only` names no sale id")
})

test("a sale entry naming no item, no price or no tax refuses the import", () => {
  expect(() => planSaleImport(NO_ITEM_NAME)).toThrow(
    saleMissingWhy("only", "item name", "as a page titled with nothing")
  )
  expect(() => planSaleImport(NO_PRICE)).toThrow(
    saleMissingWhy("only", "price", "as a sale that brought in no gold")
  )
  expect(() => planSaleImport(NO_TAX)).toThrow(
    saleMissingWhy("only", "tax", "with a payout no tax ever came out of")
  )
})

test("a sale naming a guild with no guild id refuses the import", () => {
  expect(() => planSaleImport(GUILD_NO_ID)).toThrow(
    saleMissingWhy("only", "guild id", "against a guild a later capture could not tell apart")
  )
})

test("a sale naming a guild on no megaserver refuses the import", () => {
  expect(() => planSaleImport(GUILD_NO_WORLD)).toThrow(
    saleMissingWhy("only", "megaserver", "against a guild on no megaserver")
  )
})

test("a sale naming a guild whose name reduces to no slug refuses the import", () => {
  expect(() => planSaleImport(GUILD_EMPTY_NAME)).toThrow(
    saleMissingWhy("only", "guild name a slug admits", "against a guild with no page")
  )
})

test("a capture with no Default table or no account-wide table refuses the import", () => {
  expect(() => planSaleImport(NO_DEFAULT)).toThrow(NO_DEFAULT_TABLE)
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
  expect(saleSlug("----")).toBe("sale")
  expect(saleSlug("")).toBe("sale")
})

test("a guild's slug is its megaserver then its name, each run of other characters a dash", () => {
  expect(guildSlug("NA Megaserver", "Traders")).toBe(TRADERS_SLUG)
  expect(guildSlug("EU Megaserver", "The Traders' Guild")).toBe("eu-megaserver-the-traders-guild")
  expect(guildAddress(TRADERS_SLUG)).toBe(TRADERS_ADDRESS)
})

test("a guild page is titled with the guild's name and carries its id and megaserver", () => {
  expect(guildPageValues(TRADERS)).toEqual({
    slug: TRADERS_SLUG,
    title: "Traders",
    guildId: 866125,
    worldName: "NA Megaserver",
  })
})

test("a sold-at time counted in seconds reads as a UTC timestamp to the millisecond", () => {
  expect(saleSoldAtIso(1700000000)).toBe("2023-11-14T22:13:20.000Z")
})

test("a sale missing every optional field is written without those keys", () => {
  const action: SaleUpsert = { saleId: "bare", itemName: "", salePrice: 0, tax: 0, netPayout: 0 }
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

test("a sale names its guild by the guild page's address", () => {
  const values = salePageValues("temper-account/a", saleOf("one", TRADERS), TRADERS_ADDRESS)
  expect(values.guild).toBe(TRADERS_ADDRESS)
  expect(values).not.toHaveProperty("guildName")
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
  const plan: SaleImportPlan = { actions: [saleOf("one"), saleOf("two")] }
  await writeSaleImportPlan(plan, SIGNED_IN, { ...USER, upsert })
  expect(calls.map((call) => call.pageTypeSlug)).toEqual([
    "temper-account",
    "temper-sale",
    "temper-sale",
  ])
})

test("a guild no page has yet is made once, before any sale naming it", async () => {
  const { calls, upsert } = recordingUpsert()
  const { read } = readingGuilds({})
  const plan: SaleImportPlan = { actions: [saleOf("one", TRADERS), saleOf("two", TRADERS)] }
  await writeSaleImportPlan(plan, SIGNED_IN, { ...USER, upsert, read })
  expect(calls.map((call) => call.pageTypeSlug)).toEqual([
    "temper-account",
    "temper-guild",
    "temper-sale",
    "temper-sale",
  ])
  expect(calls[1]?.where).toEqual([{ key: "slug", eq: TRADERS_SLUG }])
  expect(calls[1]?.set).toEqual(guildPageValues(TRADERS))
  expect(calls[2]?.set).toMatchObject({ guild: TRADERS_ADDRESS })
  expect(calls[3]?.set).toMatchObject({ guild: TRADERS_ADDRESS })
})

test("a guild a page already has is named without writing that page again", async () => {
  const { calls, upsert } = recordingUpsert()
  const { asked, read } = readingGuilds({ [TRADERS_SLUG]: 866125 })
  const plan: SaleImportPlan = { actions: [saleOf("one", TRADERS)] }
  await writeSaleImportPlan(plan, SIGNED_IN, { ...USER, upsert, read })
  expect(asked).toEqual([JSON.stringify([{ key: "slug", eq: TRADERS_SLUG }])])
  expect(calls.map((call) => call.pageTypeSlug)).toEqual(["temper-account", "temper-sale"])
  expect(calls[1]?.set).toMatchObject({ guild: TRADERS_ADDRESS })
})

test("a guild page holding another guild id refuses before any sale is written", async () => {
  const { calls, upsert } = recordingUpsert()
  const { read } = readingGuilds({ [TRADERS_SLUG]: 1 })
  const plan: SaleImportPlan = { actions: [saleOf("one", TRADERS)] }
  await expect(writeSaleImportPlan(plan, SIGNED_IN, { ...USER, upsert, read })).rejects.toThrow(
    guildIdMismatchWhy(TRADERS_SLUG, 1, 866125)
  )
  expect(calls.map((call) => call.pageTypeSlug)).toEqual(["temper-account"])
})

test("two sales naming one guild slug under two guild ids refuse before any sale", async () => {
  const { calls, upsert } = recordingUpsert()
  const { read } = readingGuilds({})
  const other: SaleGuild = { ...TRADERS, guildId: 2 }
  const plan: SaleImportPlan = { actions: [saleOf("one", TRADERS), saleOf("two", other)] }
  await expect(writeSaleImportPlan(plan, SIGNED_IN, { ...USER, upsert, read })).rejects.toThrow(
    guildIdMismatchWhy(TRADERS_SLUG, 866125, 2)
  )
  expect(calls.map((call) => call.pageTypeSlug)).not.toContain("temper-sale")
})

test("a guild page that comes back under another slug refuses before any sale", async () => {
  const calls: string[] = []
  const upsert: SalePageUpsert = async (args) => {
    calls.push(args.pageTypeSlug)
    return asPage({ id: "page-1", slug: "elsewhere" })
  }
  const { read } = readingGuilds({})
  const plan: SaleImportPlan = { actions: [saleOf("one", TRADERS)] }
  await expect(writeSaleImportPlan(plan, SIGNED_IN, { ...USER, upsert, read })).rejects.toThrow(
    guildNotBackWhy(TRADERS_SLUG, "elsewhere")
  )
  expect(calls).toEqual(["temper-account", "temper-guild"])
})

test("a sale page is located by its account page and its sale id together", async () => {
  const { calls, upsert } = recordingUpsert()
  await writeSaleImportPlan({ actions: [saleOf("one")] }, SIGNED_IN, { ...USER, upsert })
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
  await expect(
    writeSaleImportPlan({ actions: [saleOf("one")] }, SIGNED_OUT, { upsert })
  ).rejects.toThrow("no signed-in user to import these sales (jwt expired)")
  expect(calls).toEqual([])
})

test("the caller's user id is taken over the one the session would answer", async () => {
  const { calls, upsert } = recordingUpsert()
  const plan: SaleImportPlan = { actions: [saleOf("one")] }
  await writeSaleImportPlan(plan, SIGNED_OUT, { userId: "stated-user", upsert, addressOf })
  expect(calls[1]?.set).toMatchObject({ accountPage: "temper-account/stated-user" })
})

test("the run reports how many sales the capture held", async () => {
  const { calls, upsert } = recordingUpsert()
  const { read } = readingGuilds({})
  const lines: string[] = []
  await runImportSales(CAPTURE, SIGNED_IN, {
    ...USER,
    upsert,
    read,
    report: (message) => {
      lines.push(message)
    },
  })
  expect(lines).toEqual(["Sales import: 2 sale(s) captured."])
  expect(calls.map((call) => call.pageTypeSlug)).toEqual([
    "temper-account",
    "temper-guild",
    "temper-sale",
    "temper-sale",
  ])
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
