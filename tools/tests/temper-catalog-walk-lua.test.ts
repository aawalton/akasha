import { describe, expect, it } from "bun:test"
import { z } from "zod"
import {
  addonSource,
  bundleToLua,
  examined,
  type Subject,
  withLua,
} from "../lib/temper-addon-lua.ts"

const WALK: Subject = {
  ref: "temper/catalog-core/src/walk.ts",
  holds: ["runCatalogWalk"],
}

const SUBJECTS: readonly Subject[] = [WALK]
const LUA_SOURCE = z.string()
const WALK_RESULT = z.object({
  completed: z.boolean(),
  collectedList: z.string(),
  skipCount: z.number(),
  skipDomain: z.string(),
  skipReason: z.string(),
})
const TEETH_RESULT = z.object({ threw: z.boolean(), message: z.string() })

const WALK_SOURCE = "temper/catalog-core/src/walk.ts"


const WALK_SRC = LUA_SOURCE.parse(addonSource(WALK_SOURCE)).replace(/\bexport /g, "")

const FIXTURE = [
  WALK_SRC,
  `;(globalThis as Record<string, unknown>).__runCatalogWalk = runCatalogWalk`,
  ``,
].join("\n")

const HARNESS = `
local collected = {}
local timers = {}
local now = 0
local seq = 0

local function schedule(run, delayMs)
  seq = seq + 1
  timers[#timers + 1] = { at = now + delayMs, seq = seq, run = run }
end

local function drain(horizon)
  while true do
    local bestIndex = nil
    for i = 1, #timers do
      local t = timers[i]
      if t.at <= horizon then
        local best = bestIndex and timers[bestIndex] or nil
        if best == nil or t.at < best.at or (t.at == best.at and t.seq < best.seq) then
          bestIndex = i
        end
      end
    end
    if bestIndex == nil then break end
    local chosen = table.remove(timers, bestIndex)
    now = chosen.at
    pcall(chosen.run)
  end
end

local deps = {
  attempt = function(run)
    local ok, err = pcall(run)
    if ok then return nil end
    return tostring(err)
  end,
  schedule = schedule,
  hasCollected = function(key) return collected[key] == true end,
  log = function(_message) end,
}

local options = { domainDelayMs = 100, domainTimeoutMs = 60000 }

local function healthy(key)
  return { key = key, collect = function(onComplete)
    collected[key] = true
    onComplete()
  end }
end

-- The exact reported mechanism: an ESO API answering nil where a count is
-- expected, reaching a numeric comparison.
local function nilCompare()
  local numTraits = nil
  local traitIndex = 1
  if traitIndex <= numTraits then return 1 end
  return 0
end

-- Shape A: throws synchronously inside the collect call frame.
local function throwsSynchronously(key)
  return { key = key, collect = function(onComplete)
    nilCompare()
    collected[key] = true
    onComplete()
  end }
end

-- Shape B: the runBatched shape — yields the frame via the scheduler, then throws
-- on the NEXT tick, outside any pcall wrapped around collect.
local function throwsOnLaterFrame(key)
  return { key = key, collect = function(onComplete)
    schedule(function()
      nilCompare()
      collected[key] = true
      onComplete()
    end, 100)
  end }
end

local function runWalk(domains)
  local verdict = nil
  __runCatalogWalk(domains, deps, options, function(result) verdict = result end)
  drain(500000)
  if verdict == nil then
    return { completed = false, collectedList = "<walk never finished>", skipCount = -1, skipDomain = "", skipReason = "" }
  end
  local firstSkip = verdict.skips[1]
  return {
    completed = verdict.completed,
    collectedList = table.concat(verdict.collected, ","),
    skipCount = #verdict.skips,
    skipDomain = firstSkip and firstSkip.domain or "",
    skipReason = firstSkip and firstSkip.reason or "",
  }
end
`

describe("runCatalogWalk (real Lua 5.1)", () => {

  it("examines 1 code-repo source, and refuses where one is not there to examine", () => {
    expect(examined(SUBJECTS)).toBe(1)
  })
  it("a collector throwing a real nil-comparison does not halt the domains behind it", async () => {
    const bundle = await bundleToLua(FIXTURE)
    const result = await withLua(async (vm) => {
      await vm.run(bundle)
      return WALK_RESULT.parse(
        await vm.run(`
        ${HARNESS}
        return runWalk({
          healthy("alphaCatalog"),
          throwsSynchronously("traitResearchCatalog"),
          healthy("skillCatalog"),
          healthy("classCatalog"),
        })
      `)
      )
    })

    expect(result.collectedList).toBe("alphaCatalog,skillCatalog,classCatalog")
    expect(result.skipCount).toBe(1)
    expect(result.skipDomain).toBe("traitResearchCatalog")
    expect(result.skipReason).toContain("compare")
    expect(result.completed).toBe(false)
  })

  it("a collector that throws on a later frame (the runBatched shape) is bounded by the watchdog", async () => {
    const bundle = await bundleToLua(FIXTURE)
    const result = await withLua(async (vm) => {
      await vm.run(bundle)
      return WALK_RESULT.parse(
        await vm.run(`
        ${HARNESS}
        return runWalk({
          healthy("alphaCatalog"),
          throwsOnLaterFrame("skillCatalog"),
          healthy("classCatalog"),
        })
      `)
      )
    })

    expect(result.collectedList).toBe("alphaCatalog,classCatalog")
    expect(result.skipCount).toBe(1)
    expect(result.skipDomain).toBe("skillCatalog")
    expect(result.completed).toBe(false)
  })

  it("an all-healthy walk still reports completion with nothing skipped", async () => {
    const bundle = await bundleToLua(FIXTURE)
    const result = await withLua(async (vm) => {
      await vm.run(bundle)
      return WALK_RESULT.parse(
        await vm.run(`
        ${HARNESS}
        return runWalk({ healthy("alphaCatalog"), healthy("betaCatalog") })
      `)
      )
    })

    expect(result.collectedList).toBe("alphaCatalog,betaCatalog")
    expect(result.skipCount).toBe(0)
    expect(result.completed).toBe(true)
  })

  it("teeth: the nil-comparison collector really does throw in Lua 5.1", async () => {
    const result = await withLua(async (vm) => {
      return TEETH_RESULT.parse(
        await vm.run(`
        local ok, err = pcall(function()
          local numTraits = nil
          local traitIndex = 1
          if traitIndex <= numTraits then return 1 end
          return 0
        end)
        return { threw = not ok, message = tostring(err) }
      `)
      )
    })

    expect(result.threw).toBe(true)
    expect(result.message).toContain("compare")
  })

  it("drift guard: the walk source stays import-free so this fixture compiles it verbatim", () => {
    const walkSource = LUA_SOURCE.parse(addonSource(WALK_SOURCE))
    const importLines = walkSource.split("\n").filter((line) => /^\s*import\b/.test(line))
    expect(importLines).toEqual([])
  })
})
