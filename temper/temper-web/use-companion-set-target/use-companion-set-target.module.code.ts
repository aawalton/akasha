"use client"

import {
  applyCompanionMetadata,
  extractCompanionMetadata,
} from "@akasha/temper-build-metadata/build-metadata"
import { decodeCompanion, encodeCompanion } from "@akasha/temper-companion-codec/companion-codec"
import { getBaseRoleName } from "@akasha/temper-companions-core/companion-base-roles"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { companions as companionsData } from "@akasha/temper-companions-core/companions"
import {
  useCompanionLifecycle,
  useCompanionList,
} from "@akasha/temper-companions-ui/use-companions"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"
import { useCompletionCompanions } from "@akasha/temper-player-completion-ui/use-completion"
import { usePlayer } from "@akasha/temper-player-profile/use-player"
import { useMemo, useState, useTransition } from "react"
import type { SetTargetEntity } from "../set-target-dialog/set-target-dialog.module.code.tsx"

interface UseCompanionSetTargetArgs {
  buildId: string
  companionId: CompanionState["companion"]["id"]
}

interface UseCompanionSetTargetResult {
  setTargetEntities: readonly SetTargetEntity[]
  pendingConfirmEntity: SetTargetEntity | null
  isSettingTarget: boolean
  handleSetTarget: () => void
  handleSetTargetConfirm: () => void
  clearPendingConfirm: () => void
}

export function useCompanionSetTarget({
  buildId,
  companionId,
}: UseCompanionSetTargetArgs): UseCompanionSetTargetResult {
  const [pendingConfirmEntity, setPendingConfirmEntity] = useState<SetTargetEntity | null>(null)
  const [isSettingTarget, startTransition] = useTransition()
  const { isAuthenticated } = usePlayer()
  const { companions: completionCompanions } = useCompletionCompanions()
  const { builds: companionBuilds } = useCompanionList()
  const { setTarget } = useCompanionLifecycle()

  const buildMap = useMemo(() => new Map(companionBuilds.map((b) => [b.id, b])), [companionBuilds])

  const computeSetTargetArgs = (entityId: string) => {
    const entity = completionCompanions.find((e) => e.id === entityId)
    if (!entity) return null

    const sourceBuild = buildMap.get(buildId)
    if (sourceBuild?.buildHash == null) return null

    const sourceState = decodeCompanion(toBuildHash(sourceBuild.buildHash))
    if (!sourceState) return null

    const sourceMetadata = sourceBuild.buildMetadata
    if (!sourceMetadata) return null
    const sourceData = applyCompanionMetadata(sourceState, sourceMetadata)

    if (entity.targetBuildId != null) {
      const targetBuild = buildMap.get(entity.targetBuildId)
      const targetMetadata = targetBuild?.buildMetadata ?? undefined

      const merged: CompanionState = {
        ...sourceData,
        name: targetMetadata?.name ?? sourceData.name,
        description: targetMetadata?.description ?? sourceData.description,
      }

      const mergedHash = encodeCompanion(merged)
      const mergedMetadata = extractCompanionMetadata(merged)

      return {
        entityId,
        companionId: entity.companionId,
        buildHash: mergedHash,
        buildMetadata: mergedMetadata,
        updateExistingTargetId: entity.targetBuildId,
      }
    } else {
      let buildName = sourceData.name
      if (entity.liveBuildId != null) {
        const liveBuild = buildMap.get(entity.liveBuildId)
        const liveMetadata = liveBuild?.buildMetadata ?? undefined
        if (liveMetadata?.name != null) buildName = liveMetadata.name
      }

      const newBuildData: CompanionState = { ...sourceData, name: buildName }
      const newBuildHash = encodeCompanion(newBuildData)
      const newBuildMetadata = extractCompanionMetadata(newBuildData)

      return {
        entityId,
        companionId: entity.companionId,
        newBuildId: crypto.randomUUID(),
        buildHash: newBuildHash,
        buildMetadata: newBuildMetadata,
      }
    }
  }

  const setTargetEntities = useMemo((): readonly SetTargetEntity[] => {
    if (!isAuthenticated) return []

    return completionCompanions
      .filter((entity) => entity.companionId === companionId)
      .map((entity) => {
        const liveBuild = entity.liveBuildId != null ? buildMap.get(entity.liveBuildId) : undefined
        const targetBuild =
          entity.targetBuildId != null ? buildMap.get(entity.targetBuildId) : undefined
        const refBuild = liveBuild ?? targetBuild

        const companionName = companionsData.data[companionId]?.name ?? "Unknown"
        const decoded =
          refBuild?.buildHash != null ? decodeCompanion(toBuildHash(refBuild.buildHash)) : null
        const subtitle = decoded ? getBaseRoleName(decoded.companion.baseRoles) : "No build"

        let targetManuallyEdited = false
        if (liveBuild && targetBuild) {
          targetManuallyEdited = liveBuild.buildHash !== targetBuild.buildHash
        }

        return {
          entityId: entity.id,
          name: companionName,
          subtitle,
          hasTargetBuild: entity.targetBuildId != null,
          targetManuallyEdited,
        }
      })
  }, [isAuthenticated, completionCompanions, buildMap, companionId])

  const handleSetTarget = () => {
    const entity = setTargetEntities[0]
    if (!entity) return
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

  const clearPendingConfirm = () => setPendingConfirmEntity(null)

  return {
    setTargetEntities,
    pendingConfirmEntity,
    isSettingTarget,
    handleSetTarget,
    handleSetTargetConfirm,
    clearPendingConfirm,
  }
}
