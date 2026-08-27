import { describe, expect, it } from "bun:test"
import { createNewCharacter } from "@temper/game-characters-character/build-factory"
import {
  characterActions,
  characterReducer,
} from "@/components/characters/context/character-reducer"

describe("characterReducer", () => {
  const initialBuild = createNewCharacter()

  describe("UPDATE_BUILD", () => {
    it("should update top-level build properties", () => {
      const result = characterReducer(
        initialBuild,
        characterActions.updateBuild({ name: "My Build" })
      )
      expect(result.name).toBe("My Build")
      expect(result.description).toBe(initialBuild.description)
    })

    it("should update description", () => {
      const result = characterReducer(
        initialBuild,
        characterActions.updateBuild({ description: "A test build" })
      )
      expect(result.description).toBe("A test build")
    })
  })

  describe("UPDATE_CHARACTER", () => {
    it("should update character properties", () => {
      const result = characterReducer(
        initialBuild,
        characterActions.updateCharacter({ name: "Test Character", race: "altmer" })
      )
      expect(result.character.name).toBe("Test Character")
      expect(result.character.race).toBe("altmer")
      expect(result.character.class).toBe(initialBuild.character.class)
    })

    it("should update attributes", () => {
      const result = characterReducer(
        initialBuild,
        characterActions.updateCharacter({
          attributes: { magicka: 64, health: 0, stamina: 0 },
        })
      )
      expect(result.character.attributes.magicka).toBe(64)
    })
  })

  describe("UPDATE_EQUIPMENT", () => {
    it("should update equipment slots", () => {
      const newArmor = {
        ...initialBuild.equipment.armor,
        head: {
          itemType: "armor" as const,
          data: {
            type: "head" as const,
            weight: "light" as const,
            set: "no-set" as const,
            trait: "no-trait" as const,
            enchantment: "no-enchant" as const,
          },
        },
      }
      const result = characterReducer(
        initialBuild,
        characterActions.updateEquipment({ armor: newArmor })
      )
      expect(result.equipment.armor.head.data?.weight).toBe("light")
    })
  })

  describe("UPDATE_SKILLS", () => {
    it("should update skill bars", () => {
      const newPrimaryBar = {
        ...initialBuild.skills["primary-skill-bar"],
        "active-1": "crystal-fragments" as const,
      }
      const result = characterReducer(
        initialBuild,
        characterActions.updateSkills({ "primary-skill-bar": newPrimaryBar })
      )
      expect(result.skills["primary-skill-bar"]["active-1"]).toBe("crystal-fragments")
    })
  })

  describe("UPDATE_CHAMPION_POINTS", () => {
    it("should update champion points", () => {
      const result = characterReducer(
        initialBuild,
        characterActions.updateChampionPoints({
          warfare: {
            passive: [...initialBuild.championPoints.warfare.passive],
            slotted: ["fighting-finesse", "no-warfare-star", "no-warfare-star", "no-warfare-star"],
          },
        })
      )
      expect(result.championPoints.warfare.slotted[0]).toBe("fighting-finesse")
    })
  })

  describe("UPDATE_CONSUMABLES", () => {
    it("should update food", () => {
      const result = characterReducer(
        initialBuild,
        characterActions.updateConsumables({ foodOrDrink: "bewitched-sugar-skulls" })
      )
      expect(result.consumables.foodOrDrink).toBe("bewitched-sugar-skulls")
    })

    it("should update potion", () => {
      const result = characterReducer(
        initialBuild,
        characterActions.updateConsumables({
          potion: "vitality-protection-resistance-physical",
        })
      )
      expect(result.consumables.potion).toBe("vitality-protection-resistance-physical")
    })
  })

  describe("UPDATE_TARGET", () => {
    it("should update target armor", () => {
      const result = characterReducer(
        initialBuild,
        characterActions.updateTarget({ armor: "overland" })
      )
      expect(result.target.armor).toBe("overland")
    })

    it("should update target health", () => {
      const result = characterReducer(initialBuild, characterActions.updateTarget({ health: 0.5 }))
      expect(result.target.health).toBe(0.5)
    })
  })

  describe("SET_CLASS_WITH_CLEANUP", () => {
    it("should update class and clear incompatible data atomically", () => {
      const clearedEquipment = { ...initialBuild.equipment }
      const clearedSkills = {
        "primary-skill-bar": {
          "active-1": "no-skill" as const,
          "active-2": "no-skill" as const,
          "active-3": "no-skill" as const,
          "active-4": "no-skill" as const,
          "active-5": "no-skill" as const,
          ultimate: "no-skill" as const,
        },
        "backup-skill-bar": {
          "active-1": "no-skill" as const,
          "active-2": "no-skill" as const,
          "active-3": "no-skill" as const,
          "active-4": "no-skill" as const,
          "active-5": "no-skill" as const,
          ultimate: "no-skill" as const,
        },
      }

      const result = characterReducer(
        initialBuild,
        characterActions.setClassWithCleanup({
          newClass: "sorcerer",
          validatedSkillLineIds: [
            "sorcerer-storm-calling",
            "sorcerer-dark-magic",
            "sorcerer-daedric-summoning",
          ],
          clearedEquipment,
          clearedSkills,
        })
      )

      expect(result.character.class).toBe("sorcerer")
      expect(result.character.skillLineIds).toEqual([
        "sorcerer-storm-calling",
        "sorcerer-dark-magic",
        "sorcerer-daedric-summoning",
      ])
      expect(result.skills).toBe(clearedSkills)
      expect(result.equipment).toBe(clearedEquipment)
    })
  })

  describe("BATCH_UPDATE", () => {
    it("should apply multiple actions in sequence", () => {
      const result = characterReducer(
        initialBuild,
        characterActions.batchUpdate([
          characterActions.updateBuild({ name: "Batch Build" }),
          characterActions.updateCharacter({ race: "dunmer" }),
          characterActions.updateTarget({ armor: "overland" }),
        ])
      )

      expect(result.name).toBe("Batch Build")
      expect(result.character.race).toBe("dunmer")
      expect(result.target.armor).toBe("overland")
    })
  })

  describe("RESET", () => {
    it("should reset to provided state", () => {
      const modifiedBuild = characterReducer(
        initialBuild,
        characterActions.updateBuild({ name: "Modified" })
      )
      const freshBuild = createNewCharacter()
      freshBuild.name = "Fresh Build"

      const result = characterReducer(modifiedBuild, characterActions.reset(freshBuild))

      expect(result.name).toBe("Fresh Build")
      expect(result).toBe(freshBuild)
    })
  })

  describe("immutability", () => {
    it("should not mutate the original state", () => {
      const original = createNewCharacter()
      const originalName = original.name

      characterReducer(original, characterActions.updateBuild({ name: "New Name" }))

      expect(original.name).toBe(originalName)
    })

    it("should create new object references for nested updates", () => {
      const original = createNewCharacter()
      const result = characterReducer(original, characterActions.updateCharacter({ name: "Test" }))

      expect(result).not.toBe(original)
      expect(result.character).not.toBe(original.character)
      expect(result.equipment).toBe(original.equipment)
    })
  })
})
