"use client"

import type { CompanionState } from "@temper/game-companions-core/companion-types"
import type { CompanionId } from "@temper/game-companions-core/companions-data"
import { useCallback, useContext } from "react"
import type { CompanionAction } from "./companion-actions"
import {
  CompanionDispatchContext,
  type CompanionMetadata,
  CompanionMetadataContext,
  CompanionStateContext,
} from "./companion-contexts"
import { companionActions } from "./companion-reducer"

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
      dispatch(companionActions.updateBuild(updates))
    },
    [dispatch]
  )

  const updateCompanion = useCallback(
    (updates: Partial<CompanionState["companion"]>) => {
      dispatch(companionActions.updateCompanion(updates))
    },
    [dispatch]
  )

  const updateEquipment = useCallback(
    (updates: Partial<CompanionState["equipment"]>) => {
      dispatch(companionActions.updateEquipment(updates))
    },
    [dispatch]
  )

  const updateSkills = useCallback(
    (updates: Partial<CompanionState["skills"]>) => {
      dispatch(companionActions.updateSkills(updates))
    },
    [dispatch]
  )

  const updateTarget = useCallback(
    (updates: Partial<CompanionState["target"]>) => {
      dispatch(companionActions.updateTarget(updates))
    },
    [dispatch]
  )

  const setCompanionWithCleanup = useCallback(
    (payload: { newCompanion: CompanionId; clearedSkills: CompanionState["skills"] }) => {
      dispatch(companionActions.setCompanionWithCleanup(payload))
    },
    [dispatch]
  )

  const resetBuild = useCallback(
    (build: CompanionState) => {
      dispatch(companionActions.reset(build))
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
