import { expect, test } from "bun:test"
import { DataError } from "@akasha/errors-core/exit-code"
import { loadParityAddonTraceFromContent } from "./inventory-parity-trace.module.code.ts"

function savedVariables(accounts: string): string {
  return `TemperInventory_SavedVariables =\n{\n  ["Default"] =\n  {\n${accounts}\n  },\n}\n`
}

const TRACE_BODY = `          {
            ["schemaVersion"] = 1,
            ["timestamp"] = 1700000000,
            ["itemId"] = 4242,
            ["itemName"] = "Rope",
            ["itemLink"] = "|H1:item:4242|h|h",
            ["signals"] =
            {
              ["itemType"] = 1, ["filterType"] = 2, ["traitType"] = 3, ["equipType"] = 4,
              ["armorType"] = 5, ["weaponType"] = 6, ["quality"] = 2,
            },
            ["classification"] =
            {
              ["leafCategoryId"] = "misc/rope",
              ["ancestorChain"] = { [1] = "misc" },
              ["categoryPath"] = "misc > rope",
            },
            ["orderedWalk"] =
            {
              ["rulesConsidered"] = 3,
              ["rulesEvaluated"] = 2,
              ["matched"] = { ["index"] = 1, ["categoryId"] = "misc", ["action"] = "sell", ["conditions"] = "none" },
              ["rejections"] = { [1] = { ["index"] = 0, ["categoryId"] = "gems", ["action"] = "lock", ["reason"] = "category" } },
            },
          }`

const CARRYING = savedVariables(
  `    ["@one"] =
    {
      ["$AccountWide"] = { ["diagnostics"] = { ["lastExplain"] =
${TRACE_BODY} } },
    },`
)

test("the trace the addon kept for that item is answered", () => {
  const held = loadParityAddonTraceFromContent(CARRYING, 4242)
  expect(held.itemName).toBe("Rope")
  expect(held.orderedWalk.matched?.action).toBe("sell")
  expect(held.orderedWalk.rejections).toHaveLength(1)
})

test("a trace for another item is refused, and the refusal says which item is carried", () => {
  expect(() => loadParityAddonTraceFromContent(CARRYING, 7)).toThrow(DataError)
  expect(() => loadParityAddonTraceFromContent(CARRYING, 7)).toThrow(
    /stored lastExplain is for itemId 4242/
  )
})

test("an account carrying no diagnostic is walked past", () => {
  const held = loadParityAddonTraceFromContent(
    savedVariables(
      `    ["@empty"] = { ["$AccountWide"] = { } },
    ["@one"] =
    {
      ["$AccountWide"] = { ["diagnostics"] = { ["lastExplain"] =
${TRACE_BODY} } },
    },`
    ),
    4242
  )
  expect(held.itemId).toBe(4242)
})

test("a file carrying no last explain at all is refused as data", () => {
  expect(() =>
    loadParityAddonTraceFromContent(savedVariables(`    ["@one"] = { ["$AccountWide"] = { } },`), 1)
  ).toThrow(DataError)
})

test("a file with no Default table is refused as data", () => {
  expect(() =>
    loadParityAddonTraceFromContent("TemperInventory_SavedVariables =\n{\n}\n", 1)
  ).toThrow(DataError)
})
