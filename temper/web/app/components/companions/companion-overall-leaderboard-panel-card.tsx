"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Table, TableBody, TableCell, TableColumnLabel, TableHead, TableHeader, TableRow, TableTotalCell } from "@shared/design-primitives/components/table"
import { cn } from "@shared/design-primitives/utils/cn"
import type { CompanionBaseRoleId } from "@temper/game-companions-core/companion-base-roles-data"
import { getBaseRoleName } from "@temper/game-companions-core/companion-base-roles-data"
import { type Build, getBuildScore } from "@temper/game-companions-core/companion-leaderboard"
import { type CompanionId, companions } from "@temper/game-companions-core/companions-data"
import { useMemo } from "react"

interface OverallRankedCompanion {
  companionId: CompanionId
  companionName: string
  ranks: Record<string, number | null>
  total: number
}

interface CompanionOverallLeaderboardPanelCardProps {
  builds: readonly Build[]
  onCompanionClick?: (companionId: CompanionId) => void
}

export function CompanionOverallLeaderboardPanelCard({
  builds,
  onCompanionClick,
}: CompanionOverallLeaderboardPanelCardProps) {
  const overallData = useMemo(() => {
    const roleSetBuilds = new Map<
      string,
      { roles: CompanionBaseRoleId[]; bestByCompanion: Map<CompanionId, number> }
    >()

    for (const build of builds) {
      if (!build.buildData) continue
      if (build.visibility !== "public") continue
      if (build.buildData.companion.id === "no-companion") continue
      if (build.buildData.companion.baseRoles.length === 0) continue

      const roles = [...build.buildData.companion.baseRoles].sort()
      const key = roles.join(",")

      let entry = roleSetBuilds.get(key)
      if (!entry) {
        entry = { roles, bestByCompanion: new Map() }
        roleSetBuilds.set(key, entry)
      }

      const companionId = build.buildData.companion.id
      const score = getBuildScore(build.buildData)
      const existing = entry.bestByCompanion.get(companionId)
      if (existing === undefined || score > existing) {
        entry.bestByCompanion.set(companionId, score)
      }
    }

    const categoryResults: {
      key: string
      label: string
      rankMap: Map<CompanionId, number>
      defaultRank: number
    }[] = []

    for (const [key, { roles, bestByCompanion }] of roleSetBuilds) {
      if (bestByCompanion.size === 0) continue

      const sorted = [...bestByCompanion.entries()].sort((a, b) => b[1] - a[1])
      const rankMap = new Map<CompanionId, number>()
      for (const [i, [companionId]] of sorted.entries()) {
        rankMap.set(companionId, i + 1)
      }

      categoryResults.push({
        key,
        label: getBaseRoleName(roles),
        rankMap,
        defaultRank: sorted.length + 1,
      })
    }

    if (categoryResults.length === 0) return { categoryCount: 0, rankings: [] }

    const allCompanionIds = new Set<CompanionId>()
    for (const { rankMap } of categoryResults) {
      for (const companionId of rankMap.keys()) {
        allCompanionIds.add(companionId)
      }
    }

    const overallRankings: OverallRankedCompanion[] = [...allCompanionIds].map((companionId) => {
      const ranks: Record<string, number | null> = {}
      let total = 0

      for (const { key, rankMap, defaultRank } of categoryResults) {
        const rank = rankMap.get(companionId)
        if (rank !== undefined) {
          ranks[key] = rank
          total += rank
        } else {
          ranks[key] = null
          total += defaultRank
        }
      }

      return {
        companionId,
        companionName: companions.data[companionId].name,
        ranks,
        total,
      }
    })

    overallRankings.sort((a, b) => a.total - b.total)

    return { categoryCount: categoryResults.length, rankings: overallRankings }
  }, [builds])

  if (overallData.rankings.length === 0) return null

  return (
    <PanelCard id="overall-leaderboard" collapsible title="Overall Leaderboard">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0 text-left">#</TableHead>
            <TableHead className="w-0 text-left">Companion</TableHead>
            <TableColumnLabel
              label="Total"
              fullName="Golf Score"
              description="Sum of position ranks across all roles (lower is better)"
            />
            <TableColumnLabel
              label="1st"
              fullName="1st Place"
              description="Roles where this companion ranks #1"
            />
            <TableColumnLabel
              label="2nd"
              fullName="2nd Place"
              description="Roles where this companion ranks #2"
            />
            <TableColumnLabel
              label="3rd"
              fullName="3rd Place"
              description="Roles where this companion ranks #3"
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {overallData.rankings.map((entry, index) => {
            const rank = index + 1
            const isTop = rank <= 3
            const accentClass = isTop ? "font-semibold text-accent" : ""

            const ranks = Object.values(entry.ranks)
            const firstCount = ranks.filter((r) => r === 1).length
            const secondCount = ranks.filter((r) => r === 2).length
            const thirdCount = ranks.filter((r) => r === 3).length

            return (
              <TableRow key={entry.companionId}>
                <TableCell className={`text-left font-sans text-primary ${accentClass}`}>
                  {rank}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-left font-sans text-primary",
                    accentClass,
                    onCompanionClick && "cursor-pointer"
                  )}
                  onClick={onCompanionClick ? () => onCompanionClick(entry.companionId) : undefined}
                >
                  {entry.companionName}
                </TableCell>
                <TableTotalCell className={accentClass}>{entry.total}</TableTotalCell>
                <TableCell>
                  {firstCount !== 0 ? firstCount : <span className="text-tertiary">&mdash;</span>}
                </TableCell>
                <TableCell>
                  {secondCount !== 0 ? secondCount : <span className="text-tertiary">&mdash;</span>}
                </TableCell>
                <TableCell>
                  {thirdCount !== 0 ? thirdCount : <span className="text-tertiary">&mdash;</span>}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </PanelCard>
  )
}
