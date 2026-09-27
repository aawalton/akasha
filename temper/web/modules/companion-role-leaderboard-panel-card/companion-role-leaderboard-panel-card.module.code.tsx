"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import {
  formatCompact,
  formatFull,
  Table,
  TableBody,
  TableCell,
  TableColumnLabel,
  TableHead,
  TableHeader,
  TableRow,
  TableTotalCell,
  TableValue,
} from "akasha/design/interface/primitive/modules/table/table.module.code.tsx"
import { PagesUILink as Link } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import {
  displayRolesToLabel,
  type RankedEntry,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-leaderboard/companion-leaderboard.module.code.ts"
import { getCompanionMetricName } from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import type { CompanionId } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { companionUrl } from "akasha/temper/player/character/build/build-support/modules/build-url/build-url.module.code.ts"
import { buildId as toBuildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { LEADERBOARD_COLUMNS } from "akasha/temper/web/modules/leaderboard-columns/leaderboard-columns.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionRoleLeaderboardPanelCardCompanion } from "akasha/temper/web/phrase/pages/companion-role-leaderboard-panel-card-companion.temper-web-phrase.ts"
import { companionRoleLeaderboardPanelCardCompositeScore } from "akasha/temper/web/phrase/pages/companion-role-leaderboard-panel-card-composite-score.temper-web-phrase.ts"
import { companionRoleLeaderboardPanelCardScore } from "akasha/temper/web/phrase/pages/companion-role-leaderboard-panel-card-score.temper-web-phrase.ts"
import { companionRoleLeaderboardPanelCardScoreDescription } from "akasha/temper/web/phrase/pages/companion-role-leaderboard-panel-card-score-description.temper-web-phrase.ts"
import { companionRoleLeaderboardPanelCardTitle } from "akasha/temper/web/phrase/pages/companion-role-leaderboard-panel-card-title.temper-web-phrase.ts"

interface CompanionRoleLeaderboardPanelCardProps {
  id: string
  displayRoles: readonly string[]
  entries: readonly RankedEntry[]
  onCompanionClick?: (companionId: CompanionId) => void
}

export function CompanionRoleLeaderboardPanelCard({
  id,
  displayRoles,
  entries,
  onCompanionClick,
}: CompanionRoleLeaderboardPanelCardProps) {
  const phrase = usePhrase()
  const roleLabel = displayRolesToLabel(displayRoles)

  return (
    <PanelCard
      id={id}
      collapsible
      title={phrase(companionRoleLeaderboardPanelCardTitle.slug, { role: roleLabel })}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0 text-left">#</TableHead>
            <TableHead className="w-0 text-left">
              {phrase(companionRoleLeaderboardPanelCardCompanion.slug)}
            </TableHead>
            <TableColumnLabel
              label={phrase(companionRoleLeaderboardPanelCardScore.slug)}
              fullName={phrase(companionRoleLeaderboardPanelCardCompositeScore.slug)}
              description={phrase(companionRoleLeaderboardPanelCardScoreDescription.slug)}
            />
            {LEADERBOARD_COLUMNS.map((col) => (
              <TableColumnLabel
                key={col.metricKey}
                label={phrase(col.label.slug)}
                fullName={getCompanionMetricName(col.metricKey)}
                description={phrase(col.description.slug)}
              />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => {
            const isTopThree = entry.rank <= 3
            const accentClass = isTopThree ? "font-semibold text-accent" : ""
            return (
              <TableRow key={entry.companionId}>
                <TableCell className={`text-left font-sans text-primary ${accentClass}`}>
                  {entry.rank}
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
                <TableTotalCell className={accentClass}>
                  <Link
                    href={companionUrl(toBuildId(entry.buildId), entry.buildName)}
                    className="cursor-pointer"
                  >
                    <TableValue
                      compact={formatCompact(entry.score)}
                      full={formatFull(entry.score)}
                    />
                  </Link>
                </TableTotalCell>
                {LEADERBOARD_COLUMNS.map((col) => {
                  const value = entry.metrics[col.metricKey] ?? 0
                  return (
                    <TableCell key={col.metricKey}>
                      <TableValue compact={formatCompact(value)} full={formatFull(value)} />
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </PanelCard>
  )
}
