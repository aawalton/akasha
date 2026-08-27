import { describe, expect, it } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import type { CompletionCharacterEntry } from "../completion-next-character-resolver"
import { buildCrossCharacterCompletionIndex } from "../completion-progress-index"
import { CHAR_EMPTY, CHAR_FULL, CHAR_PARTIAL } from "./character-fixtures"
import { EMPTY_ACCOUNT, mkRosterEntry } from "./roster-fixtures"

describe("buildCrossCharacterCompletionIndex (slim container shape)", () => {
  it("returns the {characters, paths} container with one characters entry per roster character", () => {
    const roster = [
      mkRosterEntry("c1", "Alpha", 1, CHAR_EMPTY),
      mkRosterEntry("c2", "Beta", 2, CHAR_EMPTY),
    ]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(Object.keys(idx.characters).sort()).toEqual(["c1", "c2"])
    expect(idx.characters.c1).toEqual({ label: "Alpha", sortOrder: 1 })
    expect(idx.characters.c2).toEqual({ label: "Beta", sortOrder: 2 })
  })

  it("returns an empty container for an empty roster", () => {
    const idx = buildCrossCharacterCompletionIndex([], EMPTY_ACCOUNT)
    expect(idx).toEqual({ characters: {}, paths: {} })
  })

  it("rolls up slim entries and points activeEntryKey at the first incomplete by sortOrder", () => {
    const roster = [
      mkRosterEntry("c2", "Beta", 2, CHAR_EMPTY),
      mkRosterEntry("c1", "Alpha", 1, CHAR_EMPTY),
      mkRosterEntry("c3", "Gamma", 3, CHAR_EMPTY),
    ]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const entry = idx.paths["mount-training"]
    expect(entry).toBeDefined()
    if (!entry) throw new Error("mount-training missing")
    expect(entry.current).toBe(0)
    expect(entry.total).toBe(540)
    expect(entry.activeEntryKey).toBe("c1")
    expect(Object.keys(entry.entries).sort()).toEqual(["c1", "c2", "c3"])
  })

  it("stores numbers-only per-character entries — no label/sortOrder/href per entry", () => {
    const roster = [
      mkRosterEntry("c1", "Alpha", 1, CHAR_PARTIAL),
      mkRosterEntry("c2", "Beta", 2, CHAR_EMPTY),
    ]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const entry = idx.paths["mount-training"]
    if (!entry) throw new Error("mount-training missing")
    expect(entry.entries.c1).toEqual({ current: 30, total: 180 })
    expect(entry.entries.c2).toEqual({ current: 0, total: 180 })
  })

  it("omits activeEntryKey when every character is complete; rollup current === total", () => {
    const roster = [
      mkRosterEntry("c1", "Alpha", 1, CHAR_FULL),
      mkRosterEntry("c2", "Beta", 2, CHAR_FULL),
    ]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const entry = idx.paths["mount-training"]
    expect(entry).toBeDefined()
    if (!entry) throw new Error("mount-training missing")
    expect(entry.activeEntryKey).toBeUndefined()
    expect(entry.current).toBe(entry.total)
    for (const child of Object.values(entry.entries)) {
      expect(child.current).toBe(child.total)
    }
  })

  it("points activeEntryKey at the first incomplete in mixed completion", () => {
    const roster = [
      mkRosterEntry("c1", "Alpha", 1, CHAR_FULL),
      mkRosterEntry("c2", "Beta", 2, CHAR_PARTIAL),
      mkRosterEntry("c3", "Gamma", 3, CHAR_EMPTY),
    ]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const entry = idx.paths["mount-training"]
    if (!entry) throw new Error("mount-training missing")
    expect(entry.activeEntryKey).toBe("c2")
    expect(entry.current).toBe(180 + 30 + 0)
    expect(entry.total).toBe(540)
  })

  it("stores null sortOrder as Number.MAX_SAFE_INTEGER in the characters map (sorts to end)", () => {
    const roster = [
      mkRosterEntry("c-null", "ZZZ", null, CHAR_EMPTY),
      mkRosterEntry("c1", "Alpha", 1, CHAR_FULL),
    ]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(idx.characters["c-null"]?.sortOrder).toBe(Number.MAX_SAFE_INTEGER)
    const entry = idx.paths["mount-training"]
    if (!entry) throw new Error("mount-training missing")
    expect(entry.activeEntryKey).toBe("c-null")
  })

  it("uses firstName as the characters-map label", () => {
    const roster: CompletionCharacterEntry[] = [
      {
        id: "c1",
        name: "Alpha Full Name",
        firstName: "Alpha",
        sortOrder: 1,
        completion: CHAR_EMPTY,
      },
      { id: "c2", name: "Beta Full Name", firstName: "Beta", sortOrder: 2, completion: CHAR_EMPTY },
    ]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(idx.characters.c1?.label).toBe("Alpha")
    expect(idx.characters.c2?.label).toBe("Beta")
  })

  it("falls back to name when firstName is empty", () => {
    const roster: CompletionCharacterEntry[] = [
      { id: "c1", name: "Alpha Full Name", firstName: "", sortOrder: 1, completion: CHAR_EMPTY },
      { id: "c2", name: "Beta Full Name", firstName: "Beta", sortOrder: 2, completion: CHAR_EMPTY },
    ]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(idx.characters.c1?.label).toBe("Alpha Full Name")
    expect(idx.characters.c2?.label).toBe("Beta")
  })

  it("drops a path where every character resolves to undefined (characters map still populated)", () => {
    const roster = [mkRosterEntry("c1", "Alpha", 1, {}), mkRosterEntry("c2", "Beta", 2, {})]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    expect(idx.paths["mount-training"]).toBeUndefined()
    expect(idx.paths["mount-training/speed"]).toBeUndefined()
    expect(Object.keys(idx.characters).sort()).toEqual(["c1", "c2"])
  })

  it("emits a skill-morphs key for a roster entry with class/race/skill data (#9434)", () => {
    const completion: CharacterCompletion = {
      classId: 1,
      raceId: 1,
      skillLineProgress: { 35: { currentRank: 0, currentXP: 0, nextRankXP: 0, skills: {} } },
    }
    const roster = [mkRosterEntry("c1", "Alpha", 1, completion)]
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const entry = idx.paths["skill-morphs"]
    expect(entry).toBeDefined()
    if (!entry) throw new Error("skill-morphs missing")
    expect(entry.total).toBeGreaterThan(0)
    expect(entry.entries.c1?.total).toBe(entry.total)
  })
})
