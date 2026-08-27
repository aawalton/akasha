import { describe, expect, test } from "bun:test"
import type { GrimoireEntry, ScribingProgress, ScriptEntry } from "@temper/game-completion/completion-types"
import { mergeScribing } from "./scribing-merge"

function grimoire(name: string, unlocked: boolean): GrimoireEntry {
  return { name, unlocked }
}

function script(name: string, slot: number, unlocked: boolean): ScriptEntry {
  return { name, slot, unlocked }
}

function progress(
  grimoires: Record<number, GrimoireEntry>,
  scripts: Record<number, ScriptEntry>
): ScribingProgress {
  return { grimoires, scripts }
}

function fullProgress(grimoireCount: number, scriptCount: number): ScribingProgress {
  const grimoires: Record<number, GrimoireEntry> = {}
  for (let id = 1; id <= grimoireCount; id++) {
    grimoires[id] = grimoire(`grimoire-${id}`, false)
  }
  const scripts: Record<number, ScriptEntry> = {}
  for (let id = 1; id <= scriptCount; id++) {
    scripts[id] = script(`script-${id}`, 1, false)
  }
  return progress(grimoires, scripts)
}

describe("mergeScribing", () => {
  test("an absent stored capture takes the fresh scan whole", () => {
    const fresh = fullProgress(6, 40)
    expect(mergeScribing(undefined, fresh)).toEqual(fresh)
  })

  test("a grimoire only the fresh scan has is added", () => {
    const merged = mergeScribing(fullProgress(1, 0), fullProgress(6, 0))
    expect(Object.keys(merged.grimoires).length).toBe(6)
    expect(merged.grimoires[6]?.name).toBe("grimoire-6")
  })

  test("an empty fresh scan never empties a populated stored capture", () => {
    const stored = fullProgress(6, 40)
    const merged = mergeScribing(stored, progress({}, {}))
    expect(Object.keys(merged.grimoires).length).toBe(6)
    expect(Object.keys(merged.scripts).length).toBe(40)
  })

  test("a grimoire only the stored capture has is kept", () => {
    const merged = mergeScribing(fullProgress(6, 0), fullProgress(1, 0))
    expect(Object.keys(merged.grimoires).length).toBe(6)
    expect(merged.grimoires[6]?.name).toBe("grimoire-6")
  })

  test("scripts only the stored capture has are kept when a cold scan drops them", () => {
    const merged = mergeScribing(fullProgress(6, 40), fullProgress(6, 3))
    expect(Object.keys(merged.scripts).length).toBe(40)
    expect(merged.scripts[40]?.name).toBe("script-40")
  })

  test("a newly unlocked grimoire in the fresh scan lands", () => {
    const stored = progress({ 5: grimoire("Trample", false) }, {})
    const fresh = progress({ 5: grimoire("Trample", true) }, {})
    expect(mergeScribing(stored, fresh).grimoires[5]?.unlocked).toBe(true)
  })

  test("a newly unlocked script in the fresh scan lands", () => {
    const stored = progress({}, { 9: script("Anchorite", 2, false) })
    const fresh = progress({}, { 9: script("Anchorite", 2, true) })
    expect(mergeScribing(stored, fresh).scripts[9]?.unlocked).toBe(true)
  })

  test("a cold scan reporting unlocked=false never re-locks a grimoire", () => {
    const stored = progress({ 5: grimoire("Trample", true) }, {})
    const fresh = progress({ 5: grimoire("Trample", false) }, {})
    expect(mergeScribing(stored, fresh).grimoires[5]?.unlocked).toBe(true)
  })

  test("a cold scan reporting unlocked=false never re-locks a script", () => {
    const stored = progress({}, { 9: script("Anchorite", 2, true) })
    const fresh = progress({}, { 9: script("Anchorite", 2, false) })
    expect(mergeScribing(stored, fresh).scripts[9]?.unlocked).toBe(true)
  })

  test("an empty fresh name never overwrites a populated stored name", () => {
    const stored = progress({ 5: grimoire("Trample", false) }, { 9: script("Anchorite", 2, false) })
    const fresh = progress({ 5: grimoire("", true) }, { 9: script("", 0, true) })
    const merged = mergeScribing(stored, fresh)
    expect(merged.grimoires[5]?.name).toBe("Trample")
    expect(merged.scripts[9]?.name).toBe("Anchorite")
    expect(merged.grimoires[5]?.unlocked).toBe(true)
    expect(merged.scripts[9]?.unlocked).toBe(true)
  })

  test("a script's slot is never taken from a scan whose name came back empty", () => {
    const stored = progress({}, { 9: script("Anchorite", 2, false) })
    const fresh = progress({}, { 9: script("", 0, false) })
    expect(mergeScribing(stored, fresh).scripts[9]?.slot).toBe(2)
  })

  test("a warm scan does correct a slot it reads beside a populated name", () => {
    const stored = progress({}, { 9: script("Anchorite", 0, false) })
    const fresh = progress({}, { 9: script("Anchorite", 3, false) })
    expect(mergeScribing(stored, fresh).scripts[9]?.slot).toBe(3)
  })

  test("a sliver captured first heals to the full harvest on a later scan", () => {
    const sliver = progress({ 1: grimoire("Trample", true) }, {})
    const merged = mergeScribing(sliver, fullProgress(6, 40))
    expect(Object.keys(merged.grimoires).length).toBe(6)
    expect(Object.keys(merged.scripts).length).toBe(40)
    expect(merged.grimoires[1]?.unlocked).toBe(true)
  })

  test("merging is idempotent — a repeat scan changes nothing", () => {
    const stored = fullProgress(6, 40)
    expect(mergeScribing(stored, stored)).toEqual(stored)
  })
})
