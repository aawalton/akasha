import {
  type CompanionBaseRoleId,
  companionBaseRoles,
} from "@akasha/temper-companions-core/companion-base-roles"
import {
  type DecodedBuild,
  getBuildScoreWithAllRolesFallback,
} from "@akasha/temper-companions-core/companion-leaderboard"
import { type CompanionId, companions } from "@akasha/temper-companions-core/companions"
import { useMemo } from "react"
import type { CompanionPlanEntity } from "../companion-entity-panel-card/companion-entity-panel-card.module.code.tsx"
import type { CompanionLiveOnlyEntity } from "../companion-live-only-panel-card/companion-live-only-panel-card.module.code.tsx"

interface RawBuild {
  id: string
  buildHash: string | null
}

interface CompletionCompanion {
  id: string
  companionId: string
  liveBuildId?: string | null | undefined
  targetBuildId?: string | null | undefined
  roles?: readonly string[] | null | undefined
  sortOrder?: number | null | undefined
  updatedAt: number
}

interface PlanEntitiesResult {
  planEntities: readonly CompanionPlanEntity[]
  liveOnlyEntities: readonly CompanionLiveOnlyEntity[]
}

export function usePlanEntities(
  decodedBuilds: readonly DecodedBuild[],
  builds: readonly RawBuild[],
  completionCompanions: readonly CompletionCompanion[],
  userId: string | null
): PlanEntitiesResult {
  return useMemo(() => {
    const buildMap = new Map(decodedBuilds.filter((b) => b.userId === userId).map((b) => [b.id, b]))
    const rawBuildMap = new Map(builds.map((b) => [b.id, b]))

    const planEntities = completionCompanions
      .map((entity): CompanionPlanEntity | null => {
        if (!companions.has(entity.companionId)) return null

        const liveBuild = entity.liveBuildId != null ? buildMap.get(entity.liveBuildId) : undefined
        const targetBuild =
          entity.targetBuildId != null ? buildMap.get(entity.targetBuildId) : undefined

        if (!liveBuild || !targetBuild) return null

        const rawLive = entity.liveBuildId != null ? rawBuildMap.get(entity.liveBuildId) : undefined
        const rawTarget =
          entity.targetBuildId != null ? rawBuildMap.get(entity.targetBuildId) : undefined
        const targetManuallyEdited =
          !!rawLive && !!rawTarget && rawLive.buildHash !== rawTarget.buildHash

        return {
          entityId: entity.id,
          companionId: entity.companionId satisfies CompanionId,
          entityRoles: (entity.roles ?? []).filter((r): r is CompanionBaseRoleId =>
            companionBaseRoles.has(r)
          ),
          liveBuild: {
            id: liveBuild.id,
            name: liveBuild.name,
            buildData: liveBuild.buildData,
            updatedAt: liveBuild.updatedAt,
            score: liveBuild.buildData ? getBuildScoreWithAllRolesFallback(liveBuild.buildData) : 0,
          },
          targetBuild: {
            id: targetBuild.id,
            name: targetBuild.name,
            buildData: targetBuild.buildData,
            updatedAt: targetBuild.updatedAt,
            score: targetBuild.buildData
              ? getBuildScoreWithAllRolesFallback(targetBuild.buildData)
              : 0,
          },
          targetManuallyEdited,
          sortOrder: entity.sortOrder ?? null,
          updatedAt: Math.max(liveBuild.updatedAt, targetBuild.updatedAt, entity.updatedAt),
        }
      })
      .filter((e): e is CompanionPlanEntity => e !== null)

    const liveOnlyEntities = completionCompanions
      .map((entity): CompanionLiveOnlyEntity | null => {
        if (!companions.has(entity.companionId)) return null
        if (entity.targetBuildId != null) return null
        const liveBuild = entity.liveBuildId != null ? buildMap.get(entity.liveBuildId) : undefined
        if (!liveBuild) return null

        return {
          entityId: entity.id,
          companionId: entity.companionId satisfies CompanionId,
          liveBuild: {
            id: liveBuild.id,
            name: liveBuild.name,
            buildData: liveBuild.buildData,
            updatedAt: liveBuild.updatedAt,
            score: liveBuild.buildData ? getBuildScoreWithAllRolesFallback(liveBuild.buildData) : 0,
          },
          sortOrder: entity.sortOrder ?? null,
        }
      })
      .filter((e): e is CompanionLiveOnlyEntity => e !== null)

    return { planEntities, liveOnlyEntities }
  }, [decodedBuilds, builds, completionCompanions, userId])
}
