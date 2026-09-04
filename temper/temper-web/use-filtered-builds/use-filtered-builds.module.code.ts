import {
  type DecodedBuild,
  getBuildScoreAndStats,
} from "@akasha/temper-companions-core/companion-leaderboard"
import type { CompanionStatsResult } from "@akasha/temper-companions-core/companion-stats-result"
import { useMemo } from "react"
import type { FilterValues } from "../companions-filter-types/companions-filter-types.module.code.ts"

type BuildWithData = DecodedBuild & { buildData: NonNullable<DecodedBuild["buildData"]> }

type ScoredBuild = BuildWithData & { score: number; precomputedStats: CompanionStatsResult }

export function useFilteredBuilds(
  decodedBuilds: readonly DecodedBuild[],
  values: FilterValues,
  userId: string | null
): ScoredBuild[] {
  const {
    tab,
    search,
    roles: selectedRoles,
    companion: selectedCompanion,
    targetArmor: selectedTargetArmor,
    targetCount: selectedTargetCount,
    targetHealth: selectedTargetHealth,
    sortBy,
    sortDirection,
  } = values

  return useMemo(() => {
    return decodedBuilds
      .filter((build): build is BuildWithData => {
        const buildData = build.buildData
        if (!buildData) return false

        if (tab === "build" && build.userId !== userId) return false
        if (tab === "build" && build.visibility === "live") return false
        if (tab === "browse" && build.visibility !== "public") return false

        if (search !== "" && !build.name.toLowerCase().includes(search.toLowerCase())) {
          return false
        }

        if (selectedRoles.length > 0) {
          const buildRoles = buildData.companion.baseRoles
          if (buildRoles.length !== selectedRoles.length) return false
          if (!selectedRoles.every((r) => buildRoles.some((br) => br === r))) return false
        }

        if (selectedCompanion != null && buildData.companion.id !== selectedCompanion) {
          return false
        }

        if (selectedTargetArmor != null && buildData.target.armor !== selectedTargetArmor) {
          return false
        }

        if (selectedTargetCount != null) {
          const buildTargetCount = buildData.target.targetCount ?? 1
          if (selectedTargetCount === "1" && buildTargetCount !== 1) {
            return false
          }
          if (selectedTargetCount === "3" && buildTargetCount === 1) {
            return false
          }
        }

        if (selectedTargetHealth != null) {
          const buildTargetHealth = buildData.target.targetHealth ?? "full"
          if (buildTargetHealth !== selectedTargetHealth) {
            return false
          }
        }

        return true
      })
      .map((build) => {
        const { score, stats } = getBuildScoreAndStats(build.buildData)
        return { ...build, score, precomputedStats: stats }
      })
      .sort((a, b) => {
        const direction = sortDirection === "asc" ? 1 : -1
        if (sortBy === "name") {
          return a.name.localeCompare(b.name) * direction
        }
        if (sortBy === "score") {
          return (a.score - b.score) * direction
        }
        return (a.updatedAt - b.updatedAt) * direction
      })
  }, [
    decodedBuilds,
    tab,
    userId,
    search,
    selectedRoles,
    selectedCompanion,
    selectedTargetArmor,
    selectedTargetCount,
    selectedTargetHealth,
    sortBy,
    sortDirection,
  ])
}
