"use client"

import { collapseCard, scrollToCard } from "@shared/design-layout/utils/scroll-to-card"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import {
  type Build,
  type ComboRankingsMap,
  compareDisplayRoleCombos,
  displayRoleComboKey,
} from "@temper/game-companions-core/companion-leaderboard"
import type { CompanionId } from "@temper/game-companions-core/companions-data"
import { companions } from "@temper/game-companions-core/companions-data"
import { useCallback, useMemo } from "react"
import { CompanionIdentityLeaderboardPanelCard } from "@/components/companions/companion-identity-leaderboard-panel-card"
import { CompanionOverallLeaderboardPanelCard } from "@/components/companions/companion-overall-leaderboard-panel-card"
import { CompanionRoleLeaderboardPanelCard } from "@/components/companions/companion-role-leaderboard-panel-card"

interface CompanionLeaderboardContentProps {
  builds: readonly Build[]
  rankingsMap: ComboRankingsMap
}

export function CompanionLeaderboardContent({
  builds,
  rankingsMap,
}: CompanionLeaderboardContentProps) {
  const sortedCombos = useMemo(() => {
    const combos: string[][] = []
    for (const key of rankingsMap.keys()) {
      combos.push(key.split("+"))
    }
    return combos.sort(compareDisplayRoleCombos)
  }, [rankingsMap])

  const handleCompanionClick = useCallback((companionId: CompanionId) => {
    scrollToCard(`companion-leaderboard-${companionId}`, false)
  }, [])

  const handleRoleClick = useCallback((sourceCardId: string, displayRoles: readonly string[]) => {
    collapseCard(sourceCardId)
    scrollToCard(`role-leaderboard-${displayRoleComboKey(displayRoles)}`, false)
  }, [])

  const companionsWithEntries = useMemo(() => {
    const ids = new Set<CompanionId>()
    for (const entries of rankingsMap.values()) {
      for (const entry of entries) {
        ids.add(entry.companionId)
      }
    }
    return [...ids].sort((a, b) => companions.data[a].name.localeCompare(companions.data[b].name))
  }, [rankingsMap])

  return (
    <ResponsiveColumns hasSummaryPanel sortChildren={false}>
      <CompanionOverallLeaderboardPanelCard
        builds={builds}
        onCompanionClick={handleCompanionClick}
      />

      {companionsWithEntries.map((companionId) => {
        const cardId = `companion-leaderboard-${companionId}`
        return (
          <CompanionIdentityLeaderboardPanelCard
            key={companionId}
            id={cardId}
            companionId={companionId}
            rankingsMap={rankingsMap}
            sortedCombos={sortedCombos}
            onRoleClick={(displayRoles) => handleRoleClick(cardId, displayRoles)}
          />
        )
      })}

      {sortedCombos.map((displayRoles) => {
        const key = displayRoleComboKey(displayRoles)
        const entries = rankingsMap.get(key)
        if (!entries || entries.length === 0) return null
        return (
          <CompanionRoleLeaderboardPanelCard
            key={key}
            id={`role-leaderboard-${key}`}
            displayRoles={displayRoles}
            entries={entries}
            onCompanionClick={handleCompanionClick}
          />
        )
      })}
    </ResponsiveColumns>
  )
}
