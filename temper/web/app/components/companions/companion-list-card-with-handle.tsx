"use client"

import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import type { CompanionStatsResult } from "@akasha/temper-companions-core/companion-stats-result"
import { usePlayerByUserId } from "@temper/player-profile/use-player"
import { CompanionListPanelCard } from "@/components/companions/companion-list-panel-card"

interface CompanionListCardWithHandleProps {
  build: {
    id: string
    name: string
    description: string
    buildData: CompanionState | null
    createdAt: number
    updatedAt: number
    score: number
    userId: string
    visibility: string
    precomputedStats?: CompanionStatsResult | null
  }

  getCompanionName: (companionId: CompanionId) => string
  currentUserId: string | null
}

export function CompanionListCardWithHandle({
  build,
  getCompanionName,
  currentUserId,
}: CompanionListCardWithHandleProps) {
  const { handle } = usePlayerByUserId(build.userId)
  const isOwnBuild = build.userId === currentUserId

  return (
    <CompanionListPanelCard
      build={build}
      getCompanionName={getCompanionName}
      isOwnBuild={isOwnBuild}
      isTarget={build.visibility === "target"}
      userHandle={handle}
      precomputedStats={build.precomputedStats}
    />
  )
}
