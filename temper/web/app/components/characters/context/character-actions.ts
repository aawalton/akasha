import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"

export const CHARACTER_ACTIONS = {
  UPDATE_BUILD: "UPDATE_BUILD",
  UPDATE_CHARACTER: "UPDATE_CHARACTER",
  UPDATE_EQUIPMENT: "UPDATE_EQUIPMENT",
  UPDATE_SKILLS: "UPDATE_SKILLS",
  UPDATE_CHAMPION_POINTS: "UPDATE_CHAMPION_POINTS",
  UPDATE_CONSUMABLES: "UPDATE_CONSUMABLES",
  UPDATE_TARGET: "UPDATE_TARGET",
  UPDATE_ACCOUNT: "UPDATE_ACCOUNT",
  SET_CLASS_WITH_CLEANUP: "SET_CLASS_WITH_CLEANUP",
  BATCH_UPDATE: "BATCH_UPDATE",
  RESET: "RESET",
} as const

export type CharacterAction =
  | { type: typeof CHARACTER_ACTIONS.UPDATE_BUILD; payload: Partial<CharacterState> }
  | {
      type: typeof CHARACTER_ACTIONS.UPDATE_CHARACTER
      payload: Partial<CharacterState["character"]>
    }
  | {
      type: typeof CHARACTER_ACTIONS.UPDATE_EQUIPMENT
      payload: Partial<CharacterState["equipment"]>
    }
  | {
      type: typeof CHARACTER_ACTIONS.UPDATE_SKILLS
      payload: Partial<CharacterState["skills"]>
    }
  | {
      type: typeof CHARACTER_ACTIONS.UPDATE_CHAMPION_POINTS
      payload: Partial<CharacterState["championPoints"]>
    }
  | {
      type: typeof CHARACTER_ACTIONS.UPDATE_CONSUMABLES
      payload: Partial<CharacterState["consumables"]>
    }
  | {
      type: typeof CHARACTER_ACTIONS.UPDATE_TARGET
      payload: Partial<CharacterState["target"]>
    }
  | {
      type: typeof CHARACTER_ACTIONS.UPDATE_ACCOUNT
      payload: Partial<CharacterState["account"]>
    }
  | {
      type: typeof CHARACTER_ACTIONS.SET_CLASS_WITH_CLEANUP
      payload: {
        newClass: ClassId
        validatedSkillLineIds: readonly SkillLineId[]
        clearedEquipment: CharacterState["equipment"]
        clearedSkills: CharacterState["skills"]
      }
    }
  | { type: typeof CHARACTER_ACTIONS.BATCH_UPDATE; payload: readonly CharacterAction[] }
  | { type: typeof CHARACTER_ACTIONS.RESET; payload: CharacterState }
