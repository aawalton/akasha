"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import {
  Table,
  TableBody,
  TableCell,
  TableColumnLabel,
  TableHead,
  TableHeader,
  TableRow,
  TableTotalCell,
} from "akasha/design/interface/primitive/modules/table/table.module.code.tsx"
import type { CompanionBaseRoleId } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import { getBaseRoleName } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import {
  type Build,
  getBuildScore,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-leaderboard/companion-leaderboard.module.code.ts"
import {
  type CompanionId,
  getCompanionName,
} from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionOverallLeaderboardPanelCardCompanion } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-companion.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardFirst } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-first.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardFirstDescription } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-first-description.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardFirstPlace } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-first-place.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardGolfScore } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-golf-score.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardSecond } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-second.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardSecondDescription } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-second-description.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardSecondPlace } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-second-place.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardThird } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-third.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardThirdDescription } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-third-description.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardThirdPlace } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-third-place.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardTitle } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-title.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardTotal } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-total.temper-web-phrase.ts"
import { companionOverallLeaderboardPanelCardTotalDescription } from "akasha/temper/web/phrase/pages/companion-overall-leaderboard-panel-card-total-description.temper-web-phrase.ts"
import { useMemo } from "react"

const PLACE_COLUMNS = [
  {
    place: 1,
    label: companionOverallLeaderboardPanelCardFirst,
    fullName: companionOverallLeaderboardPanelCardFirstPlace,
    description: companionOverallLeaderboardPanelCardFirstDescription,
  },
  {
    place: 2,
    label: companionOverallLeaderboardPanelCardSecond,
    fullName: companionOverallLeaderboardPanelCardSecondPlace,
    description: companionOverallLeaderboardPanelCardSecondDescription,
  },
  {
    place: 3,
    label: companionOverallLeaderboardPanelCardThird,
    fullName: companionOverallLeaderboardPanelCardThirdPlace,
    description: companionOverallLeaderboardPanelCardThirdDescription,
  },
] as const

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
  const phrase = usePhrase()
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
        companionName: getCompanionName(companionId),
        ranks,
        total,
      }
    })

    overallRankings.sort((a, b) => a.total - b.total)

    return { categoryCount: categoryResults.length, rankings: overallRankings }
  }, [builds])

  if (overallData.rankings.length === 0) return null

  return (
    <PanelCard
      id="overall-leaderboard"
      collapsible
      title={phrase(companionOverallLeaderboardPanelCardTitle.slug)}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0 text-left">#</TableHead>
            <TableHead className="w-0 text-left">
              {phrase(companionOverallLeaderboardPanelCardCompanion.slug)}
            </TableHead>
            <TableColumnLabel
              label={phrase(companionOverallLeaderboardPanelCardTotal.slug)}
              fullName={phrase(companionOverallLeaderboardPanelCardGolfScore.slug)}
              description={phrase(companionOverallLeaderboardPanelCardTotalDescription.slug)}
            />
            {PLACE_COLUMNS.map((column) => (
              <TableColumnLabel
                key={column.place}
                label={phrase(column.label.slug)}
                fullName={phrase(column.fullName.slug)}
                description={phrase(column.description.slug)}
              />
            ))}
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
