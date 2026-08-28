"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { formatCompact, formatFull, Table, TableBody, TableCell, TableColumnLabel, TableHead, TableHeader, TableRow, TableTotalCell, TableValue } from "@shared/design-primitives/components/table"
import { cn } from "@shared/design-primitives/utils/cn"
import { PagesUILink as Link } from "@shared/pages-ui/router-context"
import {
  displayRolesToLabel,
  type RankedEntry,
} from "@temper/game-companions-core/companion-leaderboard"
import type { CompanionId } from "@temper/game-companions-core/companions-data"
import { companionUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"
import { LEADERBOARD_COLUMNS } from "@/components/companions/leaderboard-columns"

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
  const roleLabel = displayRolesToLabel(displayRoles)

  return (
    <PanelCard id={id} collapsible title={`${roleLabel} Leaderboard`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0 text-left">#</TableHead>
            <TableHead className="w-0 text-left">Companion</TableHead>
            <TableColumnLabel
              label="Score"
              fullName="Composite Score"
              description="Composite performance score for this role combination"
            />
            {LEADERBOARD_COLUMNS.map((col) => (
              <TableColumnLabel
                key={col.metricKey}
                label={col.label}
                fullName={col.fullName}
                description={col.description}
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
                    href={companionUrl(BuildId(entry.buildId), entry.buildName)}
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
