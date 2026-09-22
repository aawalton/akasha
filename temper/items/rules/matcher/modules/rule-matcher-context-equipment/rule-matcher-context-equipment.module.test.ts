import { describe, expect, test } from "bun:test"
import { holdCompanionCatalogFromCheckout } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.test-fixtures.ts"
import { createEmptyCompanion } from "akasha/temper/catalog/companion/companions-core/modules/companion-factory/companion-factory.module.code.ts"
import type {
  CharacterBuildInput,
  CompanionBuildInput,
  CompletionCharacterInput,
  CompletionCompanionInput,
} from "akasha/temper/items/rules/core/modules/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import {
  compileWantedCompanionEquipment,
  compileWantedEquipment,
} from "akasha/temper/items/rules/matcher/modules/rule-matcher-context-equipment/rule-matcher-context-equipment.module.code.ts"
import { encodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { AutomationSettings } from "akasha/temper/player/character/build/build-support/modules/automation-settings/automation-settings.module.code.ts"
import { encodeCompanion } from "akasha/temper/player/character/build/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import { createNewCharacter } from "akasha/temper/player/character/build/modules/build-factory/build-factory.module.code.ts"

holdCompanionCatalogFromCheckout()

const CHARACTER = "1001"

const COMPANION = "bastian"

const BUILD = "build-1"

const COMPANION_BUILD = "comp-build-1"

const ON: AutomationSettings = {
  global: { characters: { equipment: true }, companions: { equipment: true } },
  characters: {},
  companions: {},
}

function builds(): Map<string, CharacterBuildInput> {
  return new Map([[BUILD, { id: BUILD, buildHash: encodeBuild(createNewCharacter()) }]])
}

function companionBuilds(): Map<string, CompanionBuildInput> {
  return new Map([
    [COMPANION_BUILD, { id: COMPANION_BUILD, buildHash: encodeCompanion(createEmptyCompanion()) }],
  ])
}

function charWanting(targetBuildId: string | null): CompletionCharacterInput {
  return { esoCharacterId: CHARACTER, targetBuildId, sortOrder: 0, completion: {} }
}

function companionWanting(targetBuildId: string | null): CompletionCompanionInput {
  return { companionId: COMPANION, targetBuildId }
}

describe("A character whose equipment toggle is off wants no gear.", () => {
  test("a character with no settings at all wants no gear", () => {
    expect(compileWantedEquipment([charWanting(BUILD)], builds())).toEqual([])
  })

  test("a companion with no settings at all wants no gear", () => {
    expect(
      compileWantedCompanionEquipment([companionWanting(COMPANION_BUILD)], companionBuilds())
    ).toEqual([])
  })
})

describe("A toggle set on the one beats the toggle set for everyone.", () => {
  test("a character turned off under a global turn-on wants no gear", () => {
    const settings: AutomationSettings = {
      global: { characters: { equipment: true } },
      characters: { [CHARACTER]: { equipment: false } },
      companions: {},
    }

    expect(compileWantedEquipment([charWanting(BUILD)], builds(), settings)).toEqual([])
  })

  test("a companion turned off under a global turn-on wants no gear", () => {
    const settings: AutomationSettings = {
      global: { companions: { equipment: true } },
      characters: {},
      companions: { [COMPANION]: { equipment: false } },
    }

    expect(
      compileWantedCompanionEquipment(
        [companionWanting(COMPANION_BUILD)],
        companionBuilds(),
        settings
      )
    ).toEqual([])
  })
})

describe("A target build nothing holds wants no gear.", () => {
  test("a character naming no target build wants no gear", () => {
    expect(compileWantedEquipment([charWanting(null)], builds(), ON)).toEqual([])
  })

  test("a character naming a build nothing holds wants no gear", () => {
    expect(compileWantedEquipment([charWanting("missing-build")], builds(), ON)).toEqual([])
  })

  test("a companion naming no target build wants no gear", () => {
    expect(
      compileWantedCompanionEquipment([companionWanting(null)], companionBuilds(), ON)
    ).toEqual([])
  })

  test("a companion naming a build nothing holds wants no gear", () => {
    expect(
      compileWantedCompanionEquipment([companionWanting("missing")], companionBuilds(), ON)
    ).toEqual([])
  })
})

describe("A build wanting no trait in a slot wants no gear for that slot.", () => {
  test("a build fresh off the factory wants no gear even with the toggle on", () => {
    expect(compileWantedEquipment([charWanting(BUILD)], builds(), ON)).toEqual([])
  })

  test("two characters on fresh builds want no gear between them", () => {
    const second: CompletionCharacterInput = {
      esoCharacterId: "1002",
      targetBuildId: BUILD,
      sortOrder: 1,
      completion: {},
    }

    expect(compileWantedEquipment([charWanting(BUILD), second], builds(), ON)).toEqual([])
  })
})
