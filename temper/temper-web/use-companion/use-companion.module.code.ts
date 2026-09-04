"use client"

import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { useCallback, useContext } from "react"
import type { CompanionAction } from "../companion-actions/companion-actions.module.code.ts"
import {
  CompanionDispatchContext,
  type CompanionMetadata,
  CompanionMetadataContext,
  CompanionStateContext,
} from "../companion-contexts/companion-contexts.module.code.ts"
import { COMPANION_ACTION_CREATORS } from "../companion-reducer/companion-reducer.module.code.ts"

export function useCompanion(): CompanionState {
  const context = useContext(CompanionStateContext)
  if (context === null) {
    throw new Error("useCompanion must be used within a CompanionProvider")
  }
  return context
}

function useCompanionDispatch(): React.Dispatch<CompanionAction> {
  const context = useContext(CompanionDispatchContext)
  if (context === null) {
    throw new Error("useCompanionDispatch must be used within a CompanionProvider")
  }
  return context
}

export function useCompanionMetadata(): CompanionMetadata {
  const context = useContext(CompanionMetadataContext)
  if (context === null) {
    throw new Error("useCompanionMetadata must be used within a CompanionProvider")
  }
  return context
}

export function useCompanionActions() {
  const dispatch = useCompanionDispatch()

  const updateBuild = useCallback(
    (updates: Partial<CompanionState>) => {
      dispatch(COMPANION_ACTION_CREATORS.updateBuild(updates))
    },
    [dispatch]
  )

  const updateCompanion = useCallback(
    (updates: Partial<CompanionState["companion"]>) => {
      dispatch(COMPANION_ACTION_CREATORS.updateCompanion(updates))
    },
    [dispatch]
  )

  const updateEquipment = useCallback(
    (updates: Partial<CompanionState["equipment"]>) => {
      dispatch(COMPANION_ACTION_CREATORS.updateEquipment(updates))
    },
    [dispatch]
  )

  const updateSkills = useCallback(
    (updates: Partial<CompanionState["skills"]>) => {
      dispatch(COMPANION_ACTION_CREATORS.updateSkills(updates))
    },
    [dispatch]
  )

  const updateTarget = useCallback(
    (updates: Partial<CompanionState["target"]>) => {
      dispatch(COMPANION_ACTION_CREATORS.updateTarget(updates))
    },
    [dispatch]
  )

  const setCompanionWithCleanup = useCallback(
    (payload: { newCompanion: CompanionId; clearedSkills: CompanionState["skills"] }) => {
      dispatch(COMPANION_ACTION_CREATORS.setCompanionWithCleanup(payload))
    },
    [dispatch]
  )

  const resetBuild = useCallback(
    (build: CompanionState) => {
      dispatch(COMPANION_ACTION_CREATORS.reset(build))
    },
    [dispatch]
  )

  return {
    updateBuild,
    updateCompanion,
    updateEquipment,
    updateSkills,
    updateTarget,
    setCompanionWithCleanup,
    resetBuild,
  }
}
