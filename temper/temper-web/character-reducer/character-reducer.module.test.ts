import { describe, expect, it } from "bun:test"
import { createNewCharacter } from "@akasha/temper-character-build/build-factory"
import { CHARACTER_ACTION_CREATORS, characterReducer } from "./character-reducer.module.code.ts"

describe("characterReducer", () => {
  const initialBuild = createNewCharacter()

  describe("UPDATE_BUILD", () => {
    it("should update top-level build properties", () => {
      const result = characterReducer(
        initialBuild,
        CHARACTER_ACTION_CREATORS.updateBuild({ name: "My Build" })
      )
      expect(result.name).toBe("My Build")
      expect(result.description).toBe(initialBuild.description)
    })

    it("should update description", () => {
      const result = characterReducer(
        initialBuild,
        CHARACTER_ACTION_CREATORS.updateBuild({ description: "A test build" })
      )
      expect(result.description).toBe("A test build")
    })
  })

  describe("UPDATE_CHARACTER", () => {
    it("should update character properties", () => {
      const result = characterReducer(
        initialBuild,
        CHARACTER_ACTION_CREATORS.updateCharacter({ name: "Test Character", race: "altmer" })
      )
      expect(result.character.name).toBe("Test Character")
      expect(result.character.race).toBe("altmer")
      expect(result.character.class).toBe(initialBuild.character.class)
    })

    it("should update attributes", () => {
      const result = characterReducer(
        initialBuild,
        CHARACTER_ACTION_CREATORS.updateCharacter({
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
        CHARACTER_ACTION_CREATORS.updateEquipment({ armor: newArmor })
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
        CHARACTER_ACTION_CREATORS.updateSkills({ "primary-skill-bar": newPrimaryBar })
      )
      expect(result.skills["primary-skill-bar"]["active-1"]).toBe("crystal-fragments")
    })
  })

  describe("UPDATE_CHAMPION_POINTS", () => {
    it("should update champion points", () => {
      const result = characterReducer(
        initialBuild,
        CHARACTER_ACTION_CREATORS.updateChampionPoints({
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
        CHARACTER_ACTION_CREATORS.updateConsumables({ foodOrDrink: "bewitched-sugar-skulls" })
      )
      expect(result.consumables.foodOrDrink).toBe("bewitched-sugar-skulls")
    })

    it("should update potion", () => {
      const result = characterReducer(
        initialBuild,
        CHARACTER_ACTION_CREATORS.updateConsumables({
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
        CHARACTER_ACTION_CREATORS.updateTarget({ armor: "overland" })
      )
      expect(result.target.armor).toBe("overland")
    })

    it("should update target health", () => {
      const result = characterReducer(
        initialBuild,
        CHARACTER_ACTION_CREATORS.updateTarget({ health: 0.5 })
      )
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
        CHARACTER_ACTION_CREATORS.setClassWithCleanup({
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
        CHARACTER_ACTION_CREATORS.batchUpdate([
          CHARACTER_ACTION_CREATORS.updateBuild({ name: "Batch Build" }),
          CHARACTER_ACTION_CREATORS.updateCharacter({ race: "dunmer" }),
          CHARACTER_ACTION_CREATORS.updateTarget({ armor: "overland" }),
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
        CHARACTER_ACTION_CREATORS.updateBuild({ name: "Modified" })
      )
      const freshBuild = createNewCharacter()
      freshBuild.name = "Fresh Build"

      const result = characterReducer(modifiedBuild, CHARACTER_ACTION_CREATORS.reset(freshBuild))

      expect(result.name).toBe("Fresh Build")
      expect(result).toBe(freshBuild)
    })
  })

  describe("immutability", () => {
    it("should not mutate the original state", () => {
      const original = createNewCharacter()
      const originalName = original.name

      characterReducer(original, CHARACTER_ACTION_CREATORS.updateBuild({ name: "New Name" }))

      expect(original.name).toBe(originalName)
    })

    it("should create new object references for nested updates", () => {
      const original = createNewCharacter()
      const result = characterReducer(
        original,
        CHARACTER_ACTION_CREATORS.updateCharacter({ name: "Test" })
      )

      expect(result).not.toBe(original)
      expect(result.character).not.toBe(original.character)
      expect(result.equipment).toBe(original.equipment)
    })
  })
})
