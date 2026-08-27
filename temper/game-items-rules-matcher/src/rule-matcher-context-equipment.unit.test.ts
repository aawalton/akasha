import { describe, expect, it } from "bun:test"
import { createNewCharacter } from "@temper/game-characters-character/build-factory"
import { encodeBuild } from "@temper/game-codec/character/build-codec"
import { encodeCompanion } from "@temper/game-codec/companions/companion-codec"
import { createEmptyCompanion } from "@temper/game-companions-core/companion-factory"
import type {
  CharacterBuildInput,
  CompanionBuildInput,
  CompletionCharacterInput,
  CompletionCompanionInput,
} from "@temper/game-items-rules-core/rule-matcher-context-types"
import type { AutomationSettings } from "@temper/shared-engine/automation/automation-settings-types"
import {
  compileWantedCompanionEquipment,
  compileWantedEquipment,
} from "./rule-matcher-context-equipment"

function realPlayerBuildHash(): string {
  return encodeBuild(createNewCharacter())
}

function realCompanionBuildHash(): string {
  return encodeCompanion(createEmptyCompanion())
}

function buildEntry(id: string, charId?: string): CharacterBuildInput {
  return { id, buildHash: realPlayerBuildHash(), esoCharacterId: charId ?? null }
}

function compBuildEntry(id: string): CompanionBuildInput {
  return { id, buildHash: realCompanionBuildHash() }
}

function makeChar(
  esoCharId: string,
  targetBuildId: string | null = "build-1"
): CompletionCharacterInput {
  return { esoCharacterId: esoCharId, targetBuildId, sortOrder: 0, completion: {} }
}

function makeComp(
  companionId: string,
  targetBuildId: string | null = "comp-build-1"
): CompletionCompanionInput {
  return { companionId, targetBuildId }
}

const ALL_TOGGLES_ON: AutomationSettings = {
  global: { characters: { equipment: true }, companions: { equipment: true } },
  characters: {},
  companions: {},
}

describe("compileWantedEquipment", () => {
  it("returns no signatures when the equipment toggle is off (default)", () => {
    const char = makeChar("1001")
    const builds = new Map([["build-1", buildEntry("build-1", "1001")]])

    expect(compileWantedEquipment([char], builds)).toEqual([])
  })

  it("returns no signatures for a character with no targetBuildId", () => {
    const char = makeChar("1001", null)
    const builds = new Map([["build-1", buildEntry("build-1", "1001")]])

    expect(compileWantedEquipment([char], builds, ALL_TOGGLES_ON)).toEqual([])
  })

  it("returns no signatures when targetBuildId points at a missing build", () => {
    const char = makeChar("1001", "missing-build")
    const builds = new Map([["build-1", buildEntry("build-1", "1001")]])

    expect(compileWantedEquipment([char], builds, ALL_TOGGLES_ON)).toEqual([])
  })

  it("returns no signatures for a default empty build even with toggle on (no-trait slots are skipped)", () => {
    const char = makeChar("1001")
    const builds = new Map([["build-1", buildEntry("build-1", "1001")]])

    expect(compileWantedEquipment([char], builds, ALL_TOGGLES_ON)).toEqual([])
  })

  it("respects per-character equipment override (per-char false beats global true)", () => {
    const char = makeChar("1001")
    const builds = new Map([["build-1", buildEntry("build-1", "1001")]])
    const settings: AutomationSettings = {
      global: { characters: { equipment: true } },
      characters: { "1001": { equipment: false } },
      companions: {},
    }

    expect(compileWantedEquipment([char], builds, settings)).toEqual([])
  })

  it("merges signatures across multiple characters (each scoped to its own esoCharId)", () => {
    const charA = makeChar("1001")
    const charB = makeChar("1002")
    const builds = new Map([
      ["build-1", buildEntry("build-1", "1001")],
      ["build-2", buildEntry("build-2", "1002")],
    ])

    const sigs = compileWantedEquipment([charA, charB], builds, ALL_TOGGLES_ON)
    expect(sigs).toEqual([])
  })
})

describe("compileWantedCompanionEquipment", () => {
  it("returns no signatures when the companion equipment toggle is off (default)", () => {
    const comp = makeComp("bastian")
    const builds = new Map([["comp-build-1", compBuildEntry("comp-build-1")]])

    expect(compileWantedCompanionEquipment([comp], builds)).toEqual([])
  })

  it("returns no signatures for a companion with no targetBuildId", () => {
    const comp = makeComp("bastian", null)
    const builds = new Map([["comp-build-1", compBuildEntry("comp-build-1")]])

    expect(compileWantedCompanionEquipment([comp], builds, ALL_TOGGLES_ON)).toEqual([])
  })

  it("returns no signatures when targetBuildId points at a missing build", () => {
    const comp = makeComp("bastian", "missing")
    const builds = new Map([["comp-build-1", compBuildEntry("comp-build-1")]])

    expect(compileWantedCompanionEquipment([comp], builds, ALL_TOGGLES_ON)).toEqual([])
  })

  it("respects per-companion equipment override (per-comp false beats global true)", () => {
    const comp = makeComp("bastian")
    const builds = new Map([["comp-build-1", compBuildEntry("comp-build-1")]])
    const settings: AutomationSettings = {
      global: { companions: { equipment: true } },
      characters: {},
      companions: { bastian: { equipment: false } },
    }

    expect(compileWantedCompanionEquipment([comp], builds, settings)).toEqual([])
  })
})
