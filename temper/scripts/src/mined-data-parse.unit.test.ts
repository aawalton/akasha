import { describe, expect, it } from "bun:test"
import { requireMatchPositional } from "../../../shared/utils-narrow/src/require-match-positional"
import { z } from "zod"
import { minedDataMiningLua, readableItem, readableQuest } from "./_mined-data-test-helpers"
import {
  extractMinedItemRows,
  extractMinedQuestRows,
  isFullyRead,
  readMinedAccountWide,
} from "./mined-data-parse"

describe("fixture realism — the on-disk shape round-trips", () => {
  const lua = minedDataMiningLua({
    items: [readableItem(700001, { name: "Fabricated Ring", requiredCP: 160 })],
    quests: [readableQuest(800001, { name: "Fabricated Errand", zoneId: 101 })],
  })

  it("is CRLF-terminated with a trailing space after `=` on block-opening lines", () => {
    expect(lua).toContain('["items"] = \r\n')
    expect(lua.includes("\n") && !lua.includes("\r")).toBe(false)
  })

  it("writes bare bracketed integer entry keys, not quoted ones", () => {
    expect(lua).toContain("[700001] = \r\n")
    expect(lua).not.toContain('["700001"]')
  })

  it("writes setBonuses as a numeric-keyed table in hash order, not a Lua array", () => {
    const memberKeyLine = /^ {28}\[(\d+)\] = \r$/
    const keyOrder = lua
      .split("\n")
      .filter((line) => memberKeyLine.test(line))
      .map((line) => requireMatchPositional(memberKeyLine, z.tuple([z.string()]), line)[0])
    expect(keyOrder).toEqual(["4", "1", "2", "3"])
  })

  it("walks the Default → @account → $AccountWide envelope", () => {
    const accountWide = readMinedAccountWide(lua)
    expect(accountWide.version).toBe(1)
    expect(accountWide.nextItemId).toBe(900001)
  })

  it("reads the item entry the writer emitted", () => {
    const row = extractMinedItemRows(readMinedAccountWide(lua)).rows[0]
    expect(row?.itemId).toBe(700001)
    expect(row?.name).toBe("Fabricated Ring")
  })

  it("reads the quest entry the writer emitted", () => {
    const row = extractMinedQuestRows(readMinedAccountWide(lua)).rows[0]
    expect(row?.questId).toBe(800001)
    expect(row?.zoneId).toBe(101)
  })
})

describe("extract* — a fully readable map", () => {
  const accountWide = readMinedAccountWide(
    minedDataMiningLua({
      items: [readableItem(700001), readableItem(700002), readableItem(700003)],
      quests: [readableQuest(800001), readableQuest(800002)],
    })
  )

  it("returns one row per item entry", () => {
    const { rows } = extractMinedItemRows(accountWide)
    expect(rows.map((r) => r.itemId)).toEqual([700001, 700002, 700003])
  })

  it("reports the walk as fully read with no unreadable ids", () => {
    const { diagnostics } = extractMinedItemRows(accountWide)
    expect(diagnostics.unreadableIds).toEqual([])
    expect(diagnostics.nonIntegerKeys).toEqual([])
    expect(diagnostics.reasons).toEqual([])
    expect(isFullyRead(diagnostics)).toBe(true)
  })

  it("returns one row per quest entry, fully read", () => {
    const { rows, diagnostics } = extractMinedQuestRows(accountWide)
    expect(rows.map((r) => r.questId)).toEqual([800001, 800002])
    expect(isFullyRead(diagnostics)).toBe(true)
  })

  it("renames requiredCP → requiredCp and injects the map key as itemId", () => {
    const accountWideOne = readMinedAccountWide(
      minedDataMiningLua({ items: [readableItem(700009, { requiredCP: 810 })] })
    )
    const row = extractMinedItemRows(accountWideOne).rows[0]
    expect(row?.requiredCp).toBe(810)
    expect(row).not.toHaveProperty("requiredCP")
    expect(row?.itemId).toBe(700009)
  })

  it("normalizes the hash-ordered setBonuses record to an ascending array", () => {
    const row = extractMinedItemRows(accountWide).rows[0]
    expect(row?.setBonuses.map((b) => b.numRequired)).toEqual([1, 2, 3, 5])
  })
})

describe("extract* — cleared mine maps", () => {
  const accountWide = readMinedAccountWide(minedDataMiningLua({}))

  it("yields no rows and reports the empty walk as fully read", () => {
    const items = extractMinedItemRows(accountWide)
    const quests = extractMinedQuestRows(accountWide)
    expect(items.rows).toEqual([])
    expect(quests.rows).toEqual([])
    expect(isFullyRead(items.diagnostics)).toBe(true)
    expect(isFullyRead(quests.diagnostics)).toBe(true)
  })
})

describe("extract* — an unknown field on one entry", () => {
  const accountWide = readMinedAccountWide(
    minedDataMiningLua({
      items: [
        readableItem(700001),
        readableItem(700002, { unknownField: true }),
        readableItem(700003),
      ],
    })
  )
  const { rows, diagnostics } = extractMinedItemRows(accountWide)

  it("names the offending id in unreadableIds", () => {
    expect(diagnostics.unreadableIds).toEqual([700002])
  })

  it("still returns every readable entry — one bad row does not lose the rest", () => {
    expect(rows.map((r) => r.itemId)).toEqual([700001, 700003])
  })

  it("reports the walk as not fully read", () => {
    expect(isFullyRead(diagnostics)).toBe(false)
  })

  it("names the rejection signature, not just the row", () => {
    expect(diagnostics.reasons.map((r) => r.reason)).toContain("unrecognized_keys")
  })
})

describe("extract* — a malformed setBonuses member in the record shape", () => {
  const accountWide = readMinedAccountWide(
    minedDataMiningLua({
      items: [
        readableItem(700001),
        readableItem(700002, { malformedSetBonus: true }),
        readableItem(700003),
      ],
    })
  )

  it("does not throw", () => {
    expect(() => extractMinedItemRows(accountWide)).not.toThrow()
  })

  it("skips exactly the offending entry and keeps the rest", () => {
    const { rows, diagnostics } = extractMinedItemRows(accountWide)
    expect(diagnostics.unreadableIds).toEqual([700002])
    expect(rows.map((r) => r.itemId)).toEqual([700001, 700003])
  })

  it("names the failing set-bonus member by its record key in the reason", () => {
    const { diagnostics } = extractMinedItemRows(accountWide)
    expect(diagnostics.reasons.map((r) => r.reason)).toContain(
      "invalid_type at setBonuses.4.numRequired"
    )
  })
})

describe("extract* — a non-integer map key", () => {
  const accountWide = readMinedAccountWide(
    minedDataMiningLua({
      items: [readableItem(700001), { ...readableItem(700002), key: '["oops"]' }],
    })
  )
  const { rows, diagnostics } = extractMinedItemRows(accountWide)

  it("records the key in nonIntegerKeys rather than dropping it silently", () => {
    expect(diagnostics.nonIntegerKeys).toEqual(["oops"])
  })

  it("does not invent an id for it in unreadableIds", () => {
    expect(diagnostics.unreadableIds).toEqual([])
  })

  it("still blocks the fully-read verdict", () => {
    expect(isFullyRead(diagnostics)).toBe(false)
  })

  it("keeps the integer-keyed entry", () => {
    expect(rows.map((r) => r.itemId)).toEqual([700001])
  })
})

describe("extract* — reasons are ordered most-frequent-first", () => {
  const accountWide = readMinedAccountWide(
    minedDataMiningLua({
      items: [
        readableItem(700001),
        readableItem(700002, { unknownField: true }),
        readableItem(700003, { unknownField: true }),
        readableItem(700004, { unknownField: true }),
        readableItem(700005, { malformedSetBonus: true }),
      ],
    })
  )
  const { diagnostics } = extractMinedItemRows(accountWide)

  it("puts the signature with the highest count first", () => {
    expect(diagnostics.reasons[0]).toEqual({ reason: "unrecognized_keys", count: 3 })
  })

  it("orders every reason by descending count", () => {
    const counts = diagnostics.reasons.map((r) => r.count)
    expect(counts).toEqual([...counts].sort((a, b) => b - a))
  })

  it("names all four unreadable ids in file order", () => {
    expect(diagnostics.unreadableIds).toEqual([700002, 700003, 700004, 700005])
  })
})
