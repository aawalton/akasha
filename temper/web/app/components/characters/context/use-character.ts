"use client"

import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import { useCallback, useContext } from "react"
import type { CharacterAction } from "./character-actions"
import {
  CharacterDispatchContext,
  type CharacterMetadata,
  CharacterMetadataContext,
  CharacterStateContext,
} from "./character-context"
import { characterActions } from "./character-reducer"

export function useCharacter(): CharacterState {
  const context = useContext(CharacterStateContext)
  if (context === null) {
    throw new Error("useCharacter must be used within a CharacterProvider")
  }
  return context
}

function useCharacterDispatch(): React.Dispatch<CharacterAction> {
  const context = useContext(CharacterDispatchContext)
  if (context === null) {
    throw new Error("useCharacterDispatch must be used within a CharacterProvider")
  }
  return context
}

export function useCharacterMetadata(): CharacterMetadata {
  const context = useContext(CharacterMetadataContext)
  if (context === null) {
    throw new Error("useCharacterMetadata must be used within a CharacterProvider")
  }
  return context
}

export function useCharacterActions() {
  const dispatch = useCharacterDispatch()

  const updateBuild = useCallback(
    (updates: Partial<CharacterState>) => {
      dispatch(characterActions.updateBuild(updates))
    },
    [dispatch]
  )

  const updateCharacter = useCallback(
    (updates: Partial<CharacterState["character"]>) => {
      dispatch(characterActions.updateCharacter(updates))
    },
    [dispatch]
  )

  const updateEquipment = useCallback(
    (updates: Partial<CharacterState["equipment"]>) => {
      dispatch(characterActions.updateEquipment(updates))
    },
    [dispatch]
  )

  const updateSkills = useCallback(
    (updates: Partial<CharacterState["skills"]>) => {
      dispatch(characterActions.updateSkills(updates))
    },
    [dispatch]
  )

  const updateChampionPoints = useCallback(
    (updates: Partial<CharacterState["championPoints"]>) => {
      dispatch(characterActions.updateChampionPoints(updates))
    },
    [dispatch]
  )

  const updateConsumables = useCallback(
    (updates: Partial<CharacterState["consumables"]>) => {
      dispatch(characterActions.updateConsumables(updates))
    },
    [dispatch]
  )

  const updateTarget = useCallback(
    (updates: Partial<CharacterState["target"]>) => {
      dispatch(characterActions.updateTarget(updates))
    },
    [dispatch]
  )

  const updateAccount = useCallback(
    (updates: Partial<CharacterState["account"]>) => {
      dispatch(characterActions.updateAccount(updates))
    },
    [dispatch]
  )

  const setClassWithCleanup = useCallback(
    (payload: {
      newClass: ClassId
      validatedSkillLineIds: readonly SkillLineId[]
      clearedEquipment: CharacterState["equipment"]
      clearedSkills: CharacterState["skills"]
    }) => {
      dispatch(characterActions.setClassWithCleanup(payload))
    },
    [dispatch]
  )

  const resetBuild = useCallback(
    (build: CharacterState) => {
      dispatch(characterActions.reset(build))
    },
    [dispatch]
  )

  return {
    updateBuild,
    updateCharacter,
    updateEquipment,
    updateSkills,
    updateChampionPoints,
    updateConsumables,
    updateTarget,
    updateAccount,
    setClassWithCleanup,
    resetBuild,
  }
}
