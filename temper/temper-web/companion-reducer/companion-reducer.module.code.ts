import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import {
  COMPANION_ACTIONS,
  type CompanionAction,
} from "../companion-actions/companion-actions.module.code.ts"

export function companionReducer(state: CompanionState, action: CompanionAction): CompanionState {
  switch (action.type) {
    case COMPANION_ACTIONS.UPDATE_BUILD:
      return { ...state, ...action.payload }

    case COMPANION_ACTIONS.UPDATE_COMPANION:
      return {
        ...state,
        companion: { ...state.companion, ...action.payload },
      }

    case COMPANION_ACTIONS.UPDATE_EQUIPMENT:
      return {
        ...state,
        equipment: { ...state.equipment, ...action.payload },
      }

    case COMPANION_ACTIONS.UPDATE_SKILLS:
      return {
        ...state,
        skills: { ...state.skills, ...action.payload },
      }

    case COMPANION_ACTIONS.UPDATE_TARGET:
      return {
        ...state,
        target: { ...state.target, ...action.payload },
      }

    case COMPANION_ACTIONS.SET_COMPANION_WITH_CLEANUP:
      return {
        ...state,
        companion: {
          ...state.companion,
          id: action.payload.newCompanion,
        },
        skills: action.payload.clearedSkills,
      }

    case COMPANION_ACTIONS.BATCH_UPDATE:
      return action.payload.reduce((currentState, batchAction) => {
        return companionReducer(currentState, batchAction)
      }, state)

    case COMPANION_ACTIONS.RESET:
      return action.payload

    default:
      assertNever(action)
  }
}

export const COMPANION_ACTION_CREATORS = {
  updateBuild: (payload: Partial<CompanionState>): CompanionAction => ({
    type: COMPANION_ACTIONS.UPDATE_BUILD,
    payload,
  }),

  updateCompanion: (payload: Partial<CompanionState["companion"]>): CompanionAction => ({
    type: COMPANION_ACTIONS.UPDATE_COMPANION,
    payload,
  }),

  updateEquipment: (payload: Partial<CompanionState["equipment"]>): CompanionAction => ({
    type: COMPANION_ACTIONS.UPDATE_EQUIPMENT,
    payload,
  }),

  updateSkills: (payload: Partial<CompanionState["skills"]>): CompanionAction => ({
    type: COMPANION_ACTIONS.UPDATE_SKILLS,
    payload,
  }),

  updateTarget: (payload: Partial<CompanionState["target"]>): CompanionAction => ({
    type: COMPANION_ACTIONS.UPDATE_TARGET,
    payload,
  }),

  setCompanionWithCleanup: (payload: {
    newCompanion: CompanionId
    clearedSkills: CompanionState["skills"]
  }): CompanionAction => ({
    type: COMPANION_ACTIONS.SET_COMPANION_WITH_CLEANUP,
    payload,
  }),

  batchUpdate: (actions: readonly CompanionAction[]): CompanionAction => ({
    type: COMPANION_ACTIONS.BATCH_UPDATE,
    payload: actions,
  }),

  reset: (build: CompanionState): CompanionAction => ({
    type: COMPANION_ACTIONS.RESET,
    payload: build,
  }),
}
