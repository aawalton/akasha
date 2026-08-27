import { describe, expect, test } from "bun:test"
import { parseInventoryContent, parseItem } from "./inventory-parser"

describe("parseItem — authoritative-zero preservation", () => {
  test("preserves equipType / weaponType / armorType when raw value is 0", () => {
    const raw = {
      itemId: 12345,
      itemName: "Maple",
      itemLink: "|H1:item:12345:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
      quality: 1,
      filterType: 13,
      itemType: 35,
      traitType: 0,
      requiredLevel: 0,
      requiredCP: 0,
      stackCount: 1,
      equipType: 0,
      weaponType: 0,
      armorType: 0,
    }

    const parsed = parseItem(raw)
    if (!parsed) throw new Error("expected parseItem to return a record")

    expect(parsed.equipType).toBe(0)
    expect(parsed.weaponType).toBe(0)
    expect(parsed.armorType).toBe(0)
  })

  test("round-trips non-zero equipType / weaponType / armorType (regression)", () => {
    const raw = {
      itemId: 67890,
      itemName: "Iron Helm",
      itemLink: "|H1:item:67890:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
      quality: 1,
      filterType: 2,
      itemType: 2,
      traitType: 0,
      requiredLevel: 0,
      requiredCP: 0,
      stackCount: 1,
      equipType: 1,
      weaponType: 0,
      armorType: 3,
    }

    const parsed = parseItem(raw)
    if (!parsed) throw new Error("expected parseItem to return a record")

    expect(parsed.equipType).toBe(1)
    expect(parsed.armorType).toBe(3)
    expect(parsed.weaponType).toBe(0)
  })
})

const SAVED_VARIABLES_WITH_ACCOUNT_CURRENCIES = `TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
                ["db"] =
                {
                    ["meta"] =
                    {
                        ["displayName"] = "@TestAccount",
                        ["worldName"] = "NA Megaserver",
                        ["lastFullScan"] = 1765400000,
                    },
                    ["locations"] = {},
                    ["currencies"] =
                    {
                        ["characters"] =
                        {
                            ["12345"] =
                            {
                                ["displayName"] = "Test Character",
                                ["lastScanned"] = 1765400000,
                                ["balances"] =
                                {
                                    ["gold"] = 250000,
                                },
                            },
                        },
                        ["bank"] =
                        {
                            ["gold"] = 1000000,
                        },
                        ["account"] =
                        {
                            ["crowns"] = 100500,
                            ["endeavorSeals"] = 41230,
                            ["tradeBars"] = 1335,
                            ["tomePoints"] = 447,
                        },
                    },
                },
            },
        },
    },
}`

describe("parseInventoryContent — currency buckets", () => {
  test("preserves the account-wide currency bucket", () => {
    const db = parseInventoryContent(SAVED_VARIABLES_WITH_ACCOUNT_CURRENCIES)

    expect(db.currencies?.account).toEqual({
      crowns: 100500,
      endeavorSeals: 41230,
      tradeBars: 1335,
      tomePoints: 447,
    })
  })

  test("preserves character and bank buckets alongside account", () => {
    const db = parseInventoryContent(SAVED_VARIABLES_WITH_ACCOUNT_CURRENCIES)

    expect(db.currencies?.characters["12345"]?.balances).toEqual({ gold: 250000 })
    expect(db.currencies?.bank).toEqual({ gold: 1000000 })
  })
})

const SAVED_VARIABLES_WITH_PRICE_SOURCE = (value: string) => `TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
                ["db"] =
                {
                    ["meta"] =
                    {
                        ["displayName"] = "@TestAccount",
                        ["worldName"] = "NA Megaserver",
                        ["lastFullScan"] = 1765400000,
                        ["priceSource"] = "${value}",
                    },
                    ["locations"] = {},
                },
            },
        },
    },
}`

const SAVED_VARIABLES_WITHOUT_PRICE_SOURCE = `TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
                ["db"] =
                {
                    ["meta"] =
                    {
                        ["displayName"] = "@TestAccount",
                        ["worldName"] = "NA Megaserver",
                        ["lastFullScan"] = 1765400000,
                    },
                    ["locations"] = {},
                },
            },
        },
    },
}`

describe("parseInventoryContent — priceSource", () => {
  test("carries priceSource 'ttc' through the boundary", () => {
    const db = parseInventoryContent(SAVED_VARIABLES_WITH_PRICE_SOURCE("ttc"))

    expect(db.meta.priceSource).toBe("ttc")
  })

  test("carries priceSource 'none' through the boundary", () => {
    const db = parseInventoryContent(SAVED_VARIABLES_WITH_PRICE_SOURCE("none"))

    expect(db.meta.priceSource).toBe("none")
  })

  test("leaves priceSource undefined when the scan never stamped it", () => {
    const db = parseInventoryContent(SAVED_VARIABLES_WITHOUT_PRICE_SOURCE)

    expect(db.meta.priceSource).toBeUndefined()
  })

  test("rejects an unrecognized priceSource rather than passing it through", () => {
    const db = parseInventoryContent(SAVED_VARIABLES_WITH_PRICE_SOURCE("wishful"))

    expect(db.meta.priceSource).toBeUndefined()
  })
})
