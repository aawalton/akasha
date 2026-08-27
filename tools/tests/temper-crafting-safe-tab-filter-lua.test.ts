import { describe, expect, it } from "bun:test"
import { z } from "zod"
import {
  addonPath,
  addonSource,
  bundleToLua,
  examined,
  type Subject,
  withLua,
} from "../lib/temper-addon-lua.ts"

const SAFE_TAB_FILTER: Subject = {
  ref: "temper/game-crafting-addon/src/master-writ-inventory-marker/safe-tab-filter.ts",
  holds: ["safeGetTabFilterInfo"],
}

const LANGUAGE_EXTENSIONS: Subject = {
  ref: "language-extensions/index.d.ts",
  holds: ["LuaMultiReturn"],
  repo: "compiler",
}

const CONSTANTS: Subject = {
  ref: "temper/game-crafting-addon/src/master-writ-inventory-marker/constants.ts",
  holds: ["sellInformationSortOrder"],
}

const SUBJECTS: readonly Subject[] = [SAFE_TAB_FILTER, CONSTANTS, LANGUAGE_EXTENSIONS]
const LUA_SOURCE = z.string()
const FAILOPEN_RESULT = z.object({ ok: z.boolean(), allNil: z.boolean() })
const TRIPLE_RESULT = z.object({
  a: z.number(),
  b: z.string(),
  hasSell: z.boolean(),
  hasOrig: z.boolean(),
})
const CRASH_RESULT = z.object({ ok: z.boolean(), err: z.string() })


const HELPER_SRC = LUA_SOURCE.parse(
  addonSource(SAFE_TAB_FILTER.ref, SAFE_TAB_FILTER.holds)
)
  .replace(/^\s*import\s*\{[^}]*\}\s*from\s*["']\.\/constants["']\s*\n/m, "")
  .replace(/\bexport function/g, "function")

const CONSTANTS_SRC = LUA_SOURCE.parse(
  addonSource(CONSTANTS.ref, CONSTANTS.holds)
)
const SHOW_TRAIT_CONST = `const SHOW_TRAIT_HIDDEN_COLUMNS = { sellInformationSortOrder: true }`

const LANGUAGE_EXTENSIONS_DTS = addonPath(LANGUAGE_EXTENSIONS.ref, "compiler")

const FIXTURE = [
  `/// <reference path="${LANGUAGE_EXTENSIONS_DTS}" />`,
  `declare const ITEM_TYPE_DISPLAY_CATEGORY_CONSUMABLE: number`,
  `declare function pcall<TArgs extends unknown[], TReturn>(`,
  `  this: void,`,
  `  fn: (this: void, ...args: TArgs) => TReturn,`,
  `  ...args: TArgs`,
  `): LuaMultiReturn<[true, TReturn] | [false, string]>`,
  SHOW_TRAIT_CONST,
  HELPER_SRC,
  `;(globalThis as Record<string, unknown>).__safe = safeGetTabFilterInfo`,
  ``,
].join("\n")

describe("safeGetTabFilterInfo (real Lua 5.1)", () => {

  it("examines 2 code-repo sources and 1 compiler source, and refuses where one is not there to examine", () => {
    expect(examined(SUBJECTS)).toBe(3)
  })

  it("fail-opens (no throw, empty triple) when the base re-call throws a nil-index", async () => {
    const bundle = await bundleToLua(FIXTURE)
    const result = await withLua(async (vm) => {
      await vm.run(bundle)
      return FAILOPEN_RESULT.parse(
        await vm.run(`
        ITEM_TYPE_DISPLAY_CATEGORY_CONSUMABLE = 7
        -- Reproduce the base ZO_InventoryManager:GetTabFilterInfo nil-index throw
        -- (inventory.lua:1596): index a nil inventory/filterData.
        local function throwingBase()
          local inventory = nil
          return inventory.tabFilters.filterType
        end
        local ok, a, b, c = pcall(function() return __safe(throwingBase, true) end)
        return { ok = ok, allNil = (a == nil and b == nil and c == nil) }
      `)
      )
    })
    expect(result).toEqual({ ok: true, allNil: true })
  })

  it("preserves the forced trait column on the consumable tab (success path)", async () => {
    const bundle = await bundleToLua(FIXTURE)
    const result = await withLua(async (vm) => {
      await vm.run(bundle)
      return TRIPLE_RESULT.parse(
        await vm.run(`
        ITEM_TYPE_DISPLAY_CATEGORY_CONSUMABLE = 7
        local function consumableBase()
          return 7, "Consumables", { origCol = true }
        end
        local a, b, c = __safe(consumableBase, true)
        return {
          a = a,
          b = b,
          hasSell = (c ~= nil and c.sellInformationSortOrder == true),
          hasOrig = (c ~= nil and c.origCol == true),
        }
      `)
      )
    })
    expect(result).toEqual({ a: 7, b: "Consumables", hasSell: true, hasOrig: false })
  })

  it("passes through unchanged for a non-consumable category", async () => {
    const bundle = await bundleToLua(FIXTURE)
    const result = await withLua(async (vm) => {
      await vm.run(bundle)
      return TRIPLE_RESULT.parse(
        await vm.run(`
        ITEM_TYPE_DISPLAY_CATEGORY_CONSUMABLE = 7
        local function otherBase()
          return 99, "Other", { origCol = true }
        end
        local a, b, c = __safe(otherBase, true)
        return {
          a = a,
          b = b,
          hasSell = (c ~= nil and c.sellInformationSortOrder == true),
          hasOrig = (c ~= nil and c.origCol == true),
        }
      `)
      )
    })
    expect(result).toEqual({ a: 99, b: "Other", hasSell: false, hasOrig: true })
  })

  it("does not force the trait column when applyTrait is false (override disabled path)", async () => {
    const bundle = await bundleToLua(FIXTURE)
    const result = await withLua(async (vm) => {
      await vm.run(bundle)
      return TRIPLE_RESULT.parse(
        await vm.run(`
        ITEM_TYPE_DISPLAY_CATEGORY_CONSUMABLE = 7
        local function consumableBase()
          return 7, "Consumables", { origCol = true }
        end
        local a, b, c = __safe(consumableBase, false)
        return {
          a = a,
          b = b,
          hasSell = (c ~= nil and c.sellInformationSortOrder == true),
          hasOrig = (c ~= nil and c.origCol == true),
        }
      `)
      )
    })
    expect(result).toEqual({ a: 7, b: "Consumables", hasSell: false, hasOrig: true })
  })

  it("mirrors the shipped SHOW_TRAIT_HIDDEN_COLUMNS literal (drift guard)", () => {
    expect(CONSTANTS_SRC).toContain("sellInformationSortOrder: true")
  })

  it("teeth: the raw nil-index base DOES throw in Lua 5.1 (methodology reproduces the bug)", async () => {
    const result = await withLua(async (vm) => {
      return CRASH_RESULT.parse(
        await vm.run(`
        local function throwingBase()
          local inventory = nil
          return inventory.tabFilters.filterType
        end
        local ok, err = pcall(throwingBase)
        return { ok = ok, err = tostring(err) }
      `)
      )
    })
    expect(result.ok).toBe(false)
    expect(result.err).toContain("nil")
  })
})
