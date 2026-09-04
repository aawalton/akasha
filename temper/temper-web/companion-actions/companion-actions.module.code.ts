import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import type { CompanionId } from "@akasha/temper-companions-core/companions"

export const COMPANION_ACTIONS = {
  UPDATE_BUILD: "UPDATE_BUILD",
  UPDATE_COMPANION: "UPDATE_COMPANION",
  UPDATE_EQUIPMENT: "UPDATE_EQUIPMENT",
  UPDATE_SKILLS: "UPDATE_SKILLS",
  UPDATE_TARGET: "UPDATE_TARGET",
  SET_COMPANION_WITH_CLEANUP: "SET_COMPANION_WITH_CLEANUP",
  BATCH_UPDATE: "BATCH_UPDATE",
  RESET: "RESET",
} as const

export type CompanionAction =
  | { type: typeof COMPANION_ACTIONS.UPDATE_BUILD; payload: Partial<CompanionState> }
  | {
      type: typeof COMPANION_ACTIONS.UPDATE_COMPANION
      payload: Partial<CompanionState["companion"]>
    }
  | {
      type: typeof COMPANION_ACTIONS.UPDATE_EQUIPMENT
      payload: Partial<CompanionState["equipment"]>
    }
  | {
      type: typeof COMPANION_ACTIONS.UPDATE_SKILLS
      payload: Partial<CompanionState["skills"]>
    }
  | {
      type: typeof COMPANION_ACTIONS.UPDATE_TARGET
      payload: Partial<CompanionState["target"]>
    }
  | {
      type: typeof COMPANION_ACTIONS.SET_COMPANION_WITH_CLEANUP
      payload: {
        newCompanion: CompanionId
        clearedSkills: CompanionState["skills"]
      }
    }
  | { type: typeof COMPANION_ACTIONS.BATCH_UPDATE; payload: readonly CompanionAction[] }
  | { type: typeof COMPANION_ACTIONS.RESET; payload: CompanionState }
