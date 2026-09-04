"use client"

import { decodeBuild, encodeBuild } from "@akasha/temper-build-codec/build-codec"
import {
  applyCharacterMetadata,
  extractCharacterMetadata,
} from "@akasha/temper-build-metadata/build-metadata"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import {
  useCharacterLifecycle,
  useCharacterList,
} from "@akasha/temper-characters-character-ui/use-characters"
import { classes } from "@akasha/temper-classes/character-class"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { useCompletionCharacters } from "@akasha/temper-player-completion-ui/use-completion"
import { usePlayer } from "@akasha/temper-player-profile/use-player"
import { races } from "@akasha/temper-races/races"
import { useMemo, useState, useTransition } from "react"
import type { SetTargetEntity } from "../set-target-dialog/set-target-dialog.module.code.tsx"

interface UseSetTargetEntitiesParams {
  buildId: BuildId
  buildClass: ClassId
}

interface UseSetTargetEntitiesResult {
  setTargetEntities: readonly SetTargetEntity[]
  showSetTargetDialog: boolean
  setShowSetTargetDialog: (open: boolean) => void
  pendingConfirmEntity: SetTargetEntity | null
  setPendingConfirmEntity: (entity: SetTargetEntity | null) => void
  isSettingTarget: boolean
  handleSetTargetSelect: (entity: SetTargetEntity) => void
  handleSetTargetConfirm: () => void
}

export function useSetTargetEntities({
  buildId,
  buildClass,
}: UseSetTargetEntitiesParams): UseSetTargetEntitiesResult {
  const [showSetTargetDialog, setShowSetTargetDialog] = useState(false)
  const [pendingConfirmEntity, setPendingConfirmEntity] = useState<SetTargetEntity | null>(null)
  const [isSettingTarget, startTransition] = useTransition()

  const { isAuthenticated } = usePlayer()
  const { characters: completionCharacters } = useCompletionCharacters()
  const { builds: characterBuilds } = useCharacterList()
  const { setTarget } = useCharacterLifecycle()

  const buildMap = useMemo(() => new Map(characterBuilds.map((b) => [b.id, b])), [characterBuilds])

  const setTargetEntities = useMemo((): readonly SetTargetEntity[] => {
    if (!isAuthenticated) return []

    const decodedMap = new Map<
      string,
      { className: string; raceName: string; characterName: string }
    >()
    for (const b of characterBuilds) {
      const metadata = b.buildMetadata
      const decoded = b.buildHash !== "" ? decodeBuild(toBuildHash(b.buildHash)) : null
      decodedMap.set(b.id, {
        className: decoded ? (classes.data[decoded.character.class]?.name ?? "Unknown") : "Unknown",
        raceName: decoded ? (races.data[decoded.character.race]?.name ?? "Unknown") : "Unknown",
        characterName: metadata?.characterName ?? metadata?.name ?? "",
      })
    }

    return completionCharacters
      .filter((entity) => {
        const liveBuild = entity.liveBuildId != null ? buildMap.get(entity.liveBuildId) : undefined
        const targetBuild =
          entity.targetBuildId != null ? buildMap.get(entity.targetBuildId) : undefined
        const refBuild = liveBuild ?? targetBuild
        if (refBuild?.buildHash == null) return false
        const decoded = decodeBuild(toBuildHash(refBuild.buildHash))
        return decoded?.character.class === buildClass
      })
      .map((entity) => {
        const liveBuild = entity.liveBuildId != null ? buildMap.get(entity.liveBuildId) : undefined
        const targetBuild =
          entity.targetBuildId != null ? buildMap.get(entity.targetBuildId) : undefined
        const refBuild = liveBuild ?? targetBuild
        const info = refBuild ? decodedMap.get(refBuild.id) : undefined

        const characterName = info?.characterName ?? ""
        const raceName = info?.raceName ?? "Unknown"
        const className = info?.className ?? "Unknown"

        let targetManuallyEdited = false
        if (liveBuild && targetBuild) {
          targetManuallyEdited = liveBuild.buildHash !== targetBuild.buildHash
        }

        return {
          entityId: entity.id,
          name: characterName !== "" ? characterName : `${raceName} ${className}`,
          subtitle: `${raceName} ${className}`,
          hasTargetBuild: entity.targetBuildId != null,
          targetManuallyEdited,
        }
      })
  }, [isAuthenticated, completionCharacters, characterBuilds, buildMap, buildClass])

  const computeSetTargetArgs = (entityId: string) => {
    const entity = completionCharacters.find((e) => e.id === entityId)
    if (!entity) return null

    const sourceBuild = buildMap.get(buildId)
    if (sourceBuild?.buildHash == null) return null

    const sourceState = decodeBuild(toBuildHash(sourceBuild.buildHash))
    if (!sourceState) return null

    const sourceMetadata = sourceBuild.buildMetadata
    if (!sourceMetadata) return null
    const sourceData = applyCharacterMetadata(sourceState, sourceMetadata)

    if (entity.targetBuildId != null) {
      const targetBuild = buildMap.get(entity.targetBuildId)
      const targetMetadata = targetBuild?.buildMetadata ?? undefined

      const merged: CharacterState = {
        ...sourceData,
        name: targetMetadata?.name ?? sourceData.name,
        description: targetMetadata?.description ?? sourceData.description,
        character: {
          ...sourceData.character,
          name: targetMetadata?.characterName ?? sourceData.character.name,
          race: sourceData.character.race,
        },
      }

      const mergedHash = encodeBuild(merged)
      const mergedMetadata = extractCharacterMetadata(merged)

      return {
        entityId,
        esoCharacterId: entity.esoCharacterId,
        buildHash: mergedHash,
        buildMetadata: mergedMetadata,
        updateExistingTargetId: entity.targetBuildId,
      }
    } else {
      let characterName = sourceData.character.name
      let buildName = sourceData.name

      if (entity.liveBuildId != null) {
        const liveBuild = buildMap.get(entity.liveBuildId)
        const liveMetadata = liveBuild?.buildMetadata ?? undefined
        if (liveMetadata) {
          characterName = liveMetadata.characterName ?? characterName
          buildName = liveMetadata.name ?? buildName
        }
      }

      const newBuildData: CharacterState = {
        ...sourceData,
        name: buildName,
        character: {
          ...sourceData.character,
          name: characterName,
          race: sourceData.character.race,
        },
      }

      const newBuildHash = encodeBuild(newBuildData)
      const newBuildMetadata = extractCharacterMetadata(newBuildData)

      return {
        entityId,
        esoCharacterId: entity.esoCharacterId,
        newBuildId: crypto.randomUUID(),
        buildHash: newBuildHash,
        buildMetadata: newBuildMetadata,
      }
    }
  }

  const handleSetTargetSelect = (entity: SetTargetEntity) => {
    setShowSetTargetDialog(false)
    if (entity.targetManuallyEdited) {
      setPendingConfirmEntity(entity)
    } else {
      startTransition(async () => {
        const args = computeSetTargetArgs(entity.entityId)
        if (args) await setTarget(args)
      })
    }
  }

  const handleSetTargetConfirm = () => {
    if (pendingConfirmEntity) {
      const entityId = pendingConfirmEntity.entityId
      setPendingConfirmEntity(null)
      startTransition(async () => {
        const args = computeSetTargetArgs(entityId)
        if (args) await setTarget(args)
      })
    }
  }

  return {
    setTargetEntities,
    showSetTargetDialog,
    setShowSetTargetDialog,
    pendingConfirmEntity,
    setPendingConfirmEntity,
    isSettingTarget,
    handleSetTargetSelect,
    handleSetTargetConfirm,
  }
}
