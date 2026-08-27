import { describe, expect, it } from "bun:test"
import { type Dungeon, getDungeonLabel } from "./dungeon-registry"
import { getTodaysPledges, type QuestGiver } from "./pledge-rotation"
import { getSoloDifficulty } from "./solo-difficulty"

const MAJ: QuestGiver = {
  id: "qg-maj",
  name: "Maj al-Ragath",
  epoch: "2026-02-21",
  cycleLength: 12,
}

const GLIRION: QuestGiver = {
  id: "qg-glirion",
  name: "Glirion the Redbeard",
  epoch: "2026-02-21",
  cycleLength: 12,
}

const URGARLAG: QuestGiver = {
  id: "qg-urgarlag",
  name: "Urgarlag Chief-bane",
  epoch: "2026-02-18",
  cycleLength: 34,
}

const GIVERS: readonly QuestGiver[] = [MAJ, GLIRION, URGARLAG]

const MAJ_KEYS = [
  "SC2",
  "BC1",
  "FG2",
  "SC1",
  "DC2",
  "EH1",
  "WS2",
  "FG1",
  "BC2",
  "DC1",
  "EH2",
  "WS1",
] as const
const GLIRION_KEYS = [
  "DK",
  "VM",
  "CH2",
  "CA1",
  "TI",
  "BH",
  "AC",
  "SW",
  "CA2",
  "CH1",
  "VF",
  "BC",
] as const
const URGARLAG_KEYS = [
  "ICP",
  "WGT",
  "CS",
  "RM",
  "BF",
  "FH",
  "FL",
  "SP",
  "MOS",
  "MHK",
  "DoM",
  "FV",
  "LM",
  "MF",
  "IR",
  "UG",
  "CT",
  "SG",
  "BDV",
  "TC",
  "RPB",
  "TDC",
  "CA",
  "SR",
  "ERE",
  "GD",
  "BS",
  "SH",
  "BV",
  "OP",
  "ER",
  "LS",
  "NC",
  "BGF",
] as const

const LABELS: Record<string, string> = {
  SC2: "Spindleclutch II",
  BC1: "Banished Cells I",
  WS2: "Wayrest Sewers II",
  DK: "Direfrost Keep",
  VM: "Vaults of Madness",
  ICP: "Imperial City Prison",
  BV: "Bedlam Veil",
}

const DIFFICULTIES: Record<string, Dungeon["soloDifficulty"]> = {
  SC2: "easy",
  ICP: "hard",
  WS2: "medium",
  BV: "medium",
}

function buildRotation(giverId: string, keys: readonly string[]): readonly Dungeon[] {
  return keys.map((key, position) => ({
    key,
    label: LABELS[key] ?? key,
    soloDifficulty: DIFFICULTIES[key] ?? "hard",
    questGiverId: giverId,
    rotationPosition: position,
  }))
}

const DUNGEONS: readonly Dungeon[] = [
  ...buildRotation(MAJ.id, MAJ_KEYS),
  ...buildRotation(GLIRION.id, GLIRION_KEYS),
  ...buildRotation(URGARLAG.id, URGARLAG_KEYS),
]

const MAJ_EPOCH_NOON_UTC = Date.UTC(2026, 1, 21, 12, 0, 0) / 1000

describe("getDungeonLabel(dungeons, key)", () => {
  it("returns the label for a known key", () => {
    expect(getDungeonLabel(DUNGEONS, "SC2")).toBe("Spindleclutch II")
  })

  it("returns the key for an unknown key (no throw)", () => {
    expect(getDungeonLabel(DUNGEONS, "UNKNOWN_KEY")).toBe("UNKNOWN_KEY")
  })

  it("returns the empty string for an empty key", () => {
    expect(getDungeonLabel(DUNGEONS, "")).toBe("")
  })
})

describe("getSoloDifficulty(dungeons, key)", () => {
  it("returns the explicit difficulty for a known easy key", () => {
    expect(getSoloDifficulty(DUNGEONS, "SC2")).toBe("easy")
  })

  it("returns the explicit difficulty for a known hard key", () => {
    expect(getSoloDifficulty(DUNGEONS, "ICP")).toBe("hard")
  })

  it("returns 'hard' for an unknown key (default)", () => {
    expect(getSoloDifficulty(DUNGEONS, "UNKNOWN_KEY")).toBe("hard")
  })

  it("returns 'medium' for WS2 (engine-authoritative regression)", () => {
    expect(getSoloDifficulty(DUNGEONS, "WS2")).toBe("medium")
  })

  it("returns 'medium' for BV (engine-authoritative regression)", () => {
    expect(getSoloDifficulty(DUNGEONS, "BV")).toBe("medium")
  })
})

describe("getTodaysPledges(dungeons, givers, nowSec)", () => {
  it("returns one pledge per giver", () => {
    const pledges = getTodaysPledges(DUNGEONS, GIVERS, MAJ_EPOCH_NOON_UTC)
    expect(pledges).toHaveLength(3)
  })

  it("returns position-0 dungeons for Maj and Glirion at their shared epoch", () => {
    const pledges = getTodaysPledges(DUNGEONS, GIVERS, MAJ_EPOCH_NOON_UTC)
    const maj = pledges.find((p) => p.giverName === MAJ.name)
    const glirion = pledges.find((p) => p.giverName === GLIRION.name)
    expect(maj?.dungeonKey).toBe("SC2")
    expect(glirion?.dungeonKey).toBe("DK")
  })

  it("advances by one position the next ESO day", () => {
    const oneDayLater = MAJ_EPOCH_NOON_UTC + 86_400
    const pledges = getTodaysPledges(DUNGEONS, GIVERS, oneDayLater)
    const maj = pledges.find((p) => p.giverName === MAJ.name)
    const glirion = pledges.find((p) => p.giverName === GLIRION.name)
    expect(maj?.dungeonKey).toBe("BC1")
    expect(glirion?.dungeonKey).toBe("VM")
  })

  it("returns dungeon labels alongside keys", () => {
    const pledges = getTodaysPledges(DUNGEONS, GIVERS, MAJ_EPOCH_NOON_UTC)
    const maj = pledges.find((p) => p.giverName === MAJ.name)
    expect(maj?.dungeonLabel).toBe("Spindleclutch II")
  })

  it("lands at position 6 after 6 days (covered fixture entry)", () => {
    const sixDaysLater = MAJ_EPOCH_NOON_UTC + 6 * 86_400
    const pledges = getTodaysPledges(DUNGEONS, GIVERS, sixDaysLater)
    const maj = pledges.find((p) => p.giverName === MAJ.name)
    expect(maj?.dungeonKey).toBe("WS2")
  })

  it("wraps to position 0 one full cycle before epoch", () => {
    const oneCycleBefore = MAJ_EPOCH_NOON_UTC - 12 * 86_400
    const pledges = getTodaysPledges(DUNGEONS, GIVERS, oneCycleBefore)
    const maj = pledges.find((p) => p.giverName === MAJ.name)
    expect(maj?.dungeonKey).toBe("SC2")
  })

  it("DST-aware: returns three pledges for an EDT-era timestamp", () => {
    const edtTimestamp = Date.UTC(2026, 3, 15, 12, 0, 0) / 1000
    const pledges = getTodaysPledges(DUNGEONS, GIVERS, edtTimestamp)
    expect(pledges).toHaveLength(3)
  })

  it("DST-aware: returns three pledges for an EST-era timestamp", () => {
    const estTimestamp = Date.UTC(2026, 11, 15, 12, 0, 0) / 1000
    const pledges = getTodaysPledges(DUNGEONS, GIVERS, estTimestamp)
    expect(pledges).toHaveLength(3)
  })
})
