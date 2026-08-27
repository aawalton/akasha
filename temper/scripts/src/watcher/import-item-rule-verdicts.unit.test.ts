import { describe, expect, test } from "bun:test"
import { asRecord } from "../../../../shared/utils-narrow/src/as-record"
import { parseLuaSavedVariablesFile } from "@temper/shared-saved-variables/lua-parser"
import { parsePendingSettingsMutations } from "./import-item-rule-verdicts"

function parseAccountWide(body: string): unknown {
  const src = `TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@Alanarre"] =
        {
            ["$AccountWide"] =
            {
${body}
            },
        },
    },
}
`
  const root = parseLuaSavedVariablesFile(src, "TemperInventory_SavedVariables")
  const account = asRecord(asRecord(root.Default)?.["@Alanarre"])
  return asRecord(account?.["$AccountWide"])?.pendingSettingsMutations
}

function verdictEntry(index: number, fields: Readonly<Record<string, string | number>>): string {
  const lines = Object.entries(fields).map(
    ([key, value]) =>
      `                        ["${key}"] = ${typeof value === "number" ? value : `"${value}"`},`
  )
  return `                    [${index}] =
                    {
${lines.join("\n")}
                    },`
}

function outbox(...entries: readonly string[]): string {
  return `                ["pendingSettingsMutations"] =
                {
${entries.join("\n")}
                },`
}

const SELL_ENTRY = {
  kind: "item-rule-verdict",
  itemId: 45855,
  itemName: "Ancestor Silk",
  action: "sell",
} as const
const KEEP_ENTRY = {
  kind: "item-rule-verdict",
  itemId: 33217,
  itemName: "Rubedite Ore",
  action: "nothing",
} as const

describe("the real ESO wire shape", () => {
  test("is a numeric-keyed Record, NOT a JS array", () => {
    const raw = parseAccountWide(outbox(verdictEntry(1, SELL_ENTRY)))
    expect(Array.isArray(raw)).toBe(false)
    expect(raw).toEqual({ "1": SELL_ENTRY })
  })
})

describe("parsePendingSettingsMutations", () => {
  test("recovers every entry from a real bracketed-key payload", () => {
    const raw = parseAccountWide(outbox(verdictEntry(1, SELL_ENTRY), verdictEntry(2, KEEP_ENTRY)))
    expect(parsePendingSettingsMutations(raw)).toEqual({
      found: 2,
      mutations: [SELL_ENTRY, KEEP_ENTRY],
    })
  })

  test("recovers a sparse, non-1-based table (ESO emits these — `[4]` as a first key)", () => {
    const raw = parseAccountWide(outbox(verdictEntry(4, SELL_ENTRY)))
    expect(parsePendingSettingsMutations(raw)).toEqual({ found: 1, mutations: [SELL_ENTRY] })
  })

  test("returns zero found for a genuinely empty outbox", () => {
    expect(parsePendingSettingsMutations(parseAccountWide(outbox()))).toEqual({
      found: 0,
      mutations: [],
    })
  })

  test("returns zero found for a missing / undefined outbox", () => {
    expect(
      parsePendingSettingsMutations(parseAccountWide(`                ["other"] = 1,`))
    ).toEqual({ found: 0, mutations: [] })
    expect(parsePendingSettingsMutations(undefined)).toEqual({ found: 0, mutations: [] })
    expect(parsePendingSettingsMutations(null)).toEqual({ found: 0, mutations: [] })
  })

  test("returns zero found for a scalar value where a table was expected", () => {
    expect(parsePendingSettingsMutations("nope")).toEqual({ found: 0, mutations: [] })
    expect(parsePendingSettingsMutations(7)).toEqual({ found: 0, mutations: [] })
  })

  test("counts a dropped entry in `found` so the shortfall is visible", () => {
    const raw = parseAccountWide(outbox(verdictEntry(1, { ...SELL_ENTRY, action: "deconstruct" })))
    expect(parsePendingSettingsMutations(raw)).toEqual({ found: 1, mutations: [] })
  })

  test("drops an entry with an unknown kind", () => {
    const raw = parseAccountWide(outbox(verdictEntry(1, { ...SELL_ENTRY, kind: "temper-lock" })))
    expect(parsePendingSettingsMutations(raw)).toEqual({ found: 1, mutations: [] })
  })

  test("drops an entry missing itemId", () => {
    const raw = parseAccountWide(
      outbox(verdictEntry(1, { kind: "item-rule-verdict", itemName: "X", action: "sell" }))
    )
    expect(parsePendingSettingsMutations(raw)).toEqual({ found: 1, mutations: [] })
  })

  test("drops an entry carrying an unknown extra key (strict)", () => {
    const raw = parseAccountWide(outbox(verdictEntry(1, { ...SELL_ENTRY, foo: 1 })))
    expect(parsePendingSettingsMutations(raw)).toEqual({ found: 1, mutations: [] })
  })

  test("keeps the valid entries and drops the invalid ones in a mixed batch", () => {
    const raw = parseAccountWide(
      outbox(
        verdictEntry(1, KEEP_ENTRY),
        verdictEntry(2, { ...SELL_ENTRY, action: "explode" }),
        verdictEntry(3, SELL_ENTRY)
      )
    )
    expect(parsePendingSettingsMutations(raw)).toEqual({
      found: 3,
      mutations: [KEEP_ENTRY, SELL_ENTRY],
    })
  })
})
