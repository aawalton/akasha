import { describe, expect, it } from "bun:test"
import { z } from "zod"
import {
  addonSource,
  bundleToLua,
  examined,
  type Subject,
  withLua,
} from "../lib/temper-addon-lua.ts"

const SAFE_SORT: Subject = {
  ref: "packages/temper/game/combat/addon/src/actions/model/safe-sort.ts",
  holds: ["compactAndSort"],
}

const SUBJECTS: readonly Subject[] = [SAFE_SORT]
const LUA_SOURCE = z.string()
const SORT_RESULT = z.object({
  ok: z.boolean(),
  len: z.number().optional(),
  v1: z.number().optional(),
  v2: z.number().optional(),
  err: z.string().optional(),
})
const CRASH_RESULT = z.object({ ok: z.boolean(), err: z.string() })


const HELPER_SRC = LUA_SOURCE.parse(
  addonSource(SAFE_SORT.ref, SAFE_SORT.holds)
)
const FIXTURE = [
  HELPER_SRC.replace(/\bexport function/g, "function"),
  `interface Item { v: number }`,
  `function byV(a: Item, b: Item): boolean { return a.v < b.v }`,
  `function alwaysBefore(_a: Item, _b: Item): boolean { return true }`,
  `const sortByV: (this: void, list: Item[]) => Item[] = (list) => compactAndSort(list, byV)`,
  `const sortAlways: (this: void, list: Item[]) => Item[] = (list) => compactAndSort(list, alwaysBefore)`,
  `;(globalThis as Record<string, unknown>).__sortByV = sortByV`,
  `;(globalThis as Record<string, unknown>).__sortAlways = sortAlways`,
  ``,
].join("\n")

describe("compactAndSort (real Lua 5.1)", () => {

  it("examines 1 code-repo source, and refuses where one is not there to examine", () => {
    expect(examined(SUBJECTS)).toBe(1)
  })

  it("does not crash on a nil hole and drops it (the production crash)", async () => {
    const bundle = await bundleToLua(FIXTURE)
    const result = await withLua(async (vm) => {
      await vm.run(bundle)
      return SORT_RESULT.parse(
        await vm.run(`
        local arr = { {v=3}, {v=2}, {v=1} }
        arr[2] = nil  -- dense-built then nil'd: #arr == 3, table.sort would index arr[2]=nil
        local ok, res = pcall(function() return __sortByV(arr) end)
        if not ok then return { ok = false, err = tostring(res) } end
        return { ok = true, len = #res, v1 = res[1].v, v2 = res[2].v }
      `)
      )
    })
    expect(result).toMatchObject({ ok: true, len: 2, v1: 1, v2: 3 })
  })

  it("does not crash on a non-strict-weak-order comparator (table.sort overrun)", async () => {
    const bundle = await bundleToLua(FIXTURE)
    const result = await withLua(async (vm) => {
      await vm.run(bundle)
      return SORT_RESULT.parse(
        await vm.run(`
        local arr = {}
        for i = 1, 40 do arr[i] = { v = i } end
        -- __sortAlways uses an always-"before" comparator: never a strict weak order
        local ok, res = pcall(function() return __sortAlways(arr) end)
        if not ok then return { ok = false, err = tostring(res) } end
        return { ok = true, len = #res }
      `)
      )
    })
    expect(result).toMatchObject({ ok: true, len: 40 })
  })

  it("teeth: raw table.sort over the same hole DOES crash in Lua 5.1", async () => {
    const result = await withLua(async (vm) => {
      return CRASH_RESULT.parse(
        await vm.run(`
        local arr = { {v=3}, {v=2}, {v=1} }
        arr[2] = nil
        local ok, err = pcall(function()
          table.sort(arr, function(a, b) return a.v < b.v end)
        end)
        return { ok = ok, err = tostring(err) }
      `)
      )
    })
    expect(result.ok).toBe(false)
    expect(result.err).toContain("nil")
  })
})
