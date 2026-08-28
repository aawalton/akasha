"use client"

import { formatCompact, formatFull, formatPercent, formatPercentFull, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableRowLabel, TableTotalCell, TableValue } from "@shared/design-primitives/components/table"
import {
  type RotationBreakdownRowId,
  rotationBreakdownRows,
} from "@temper/game-companions-core/rotation-breakdown-row-data"
import {
  buildSlotData,
  computeRotationTotals,
} from "@temper/game-companions-core/stats/companion-rotation-slot-data"
import type { SkillBreakdownTableProps } from "@/components/companion-skills/companion-rotation-breakdown-types"
import { SkillColumnHeader } from "@/components/companion-skills/companion-rotation-skill-column-header"

function rowLabel(id: RotationBreakdownRowId) {
  const { name: label, fullName, description } = rotationBreakdownRows.data[id]
  return { label, fullName, description }
}

export function SkillBreakdownTable({
  summaries,
  cycleDuration,
  formulaStats,
  metricStats,
  skillBar,
  primaryRows,
}: SkillBreakdownTableProps) {
  const slotData = buildSlotData(summaries, cycleDuration, formulaStats, metricStats, skillBar)
  const {
    totalDamage,
    totalHealing,
    totalCasts,
    totalDps,
    totalSps,
    totalSpc,
    totalHps,
    totalDpc,
    totalHpc,
    totalTps,
  } = computeRotationTotals(slotData, summaries, cycleDuration, metricStats)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16" />
          {slotData.map((data) => (
            <SkillColumnHeader key={data.slotId} data={data} stats={formulaStats} />
          ))}
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {}
        <TableRow>
          <TableRowLabel {...rowLabel("damage")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                <TableValue compact={formatCompact(data.damage)} full={formatFull(data.damage)} />
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>
            <TableValue compact={formatCompact(totalDamage)} full={formatFull(totalDamage)} />
          </TableTotalCell>
        </TableRow>
        <TableRow>
          <TableRowLabel {...rowLabel("d-percent")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                <TableValue
                  compact={formatPercent(data.damagePercent)}
                  full={formatPercentFull(data.damagePercent)}
                />
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>100%</TableTotalCell>
        </TableRow>
        <TableRow>
          <TableRowLabel {...rowLabel("dps")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                <TableValue compact={formatCompact(data.dps)} full={formatFull(data.dps)} />
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>
            <TableValue compact={formatCompact(totalDps)} full={formatFull(totalDps)} />
          </TableTotalCell>
        </TableRow>
        <TableRow
          className={
            primaryRows?.includes("dpc")
              ? "font-bold [&_td]:text-inherit [&_td_button]:text-inherit"
              : undefined
          }
        >
          <TableRowLabel {...rowLabel("dpc")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                <TableValue compact={formatCompact(data.dpc)} full={formatFull(data.dpc)} />
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>
            <TableValue compact={formatCompact(totalDpc)} full={formatFull(totalDpc)} />
          </TableTotalCell>
        </TableRow>

        {}
        <TableRow>
          <TableRowLabel {...rowLabel("healing")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                <TableValue compact={formatCompact(data.healing)} full={formatFull(data.healing)} />
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>
            <TableValue compact={formatCompact(totalHealing)} full={formatFull(totalHealing)} />
          </TableTotalCell>
        </TableRow>
        <TableRow>
          <TableRowLabel {...rowLabel("h-percent")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                <TableValue
                  compact={formatPercent(data.healingPercent)}
                  full={formatPercentFull(data.healingPercent)}
                />
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>100%</TableTotalCell>
        </TableRow>
        <TableRow>
          <TableRowLabel {...rowLabel("sps")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                <TableValue compact={formatCompact(data.sps)} full={formatFull(data.sps)} />
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>
            <TableValue compact={formatCompact(totalSps)} full={formatFull(totalSps)} />
          </TableTotalCell>
        </TableRow>
        <TableRow>
          <TableRowLabel {...rowLabel("spc")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                <TableValue compact={formatCompact(data.spc)} full={formatFull(data.spc)} />
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>
            <TableValue compact={formatCompact(totalSpc)} full={formatFull(totalSpc)} />
          </TableTotalCell>
        </TableRow>
        <TableRow>
          <TableRowLabel {...rowLabel("hps")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                <TableValue compact={formatCompact(data.hps)} full={formatFull(data.hps)} />
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>
            <TableValue compact={formatCompact(totalHps)} full={formatFull(totalHps)} />
          </TableTotalCell>
        </TableRow>
        <TableRow
          className={
            primaryRows?.includes("hpc")
              ? "font-bold [&_td]:text-inherit [&_td_button]:text-inherit"
              : undefined
          }
        >
          <TableRowLabel {...rowLabel("hpc")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                <TableValue compact={formatCompact(data.hpc)} full={formatFull(data.hpc)} />
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>
            <TableValue compact={formatCompact(totalHpc)} full={formatFull(totalHpc)} />
          </TableTotalCell>
        </TableRow>
        <TableRow
          className={
            primaryRows?.includes("tps")
              ? "font-bold [&_td]:text-inherit [&_td_button]:text-inherit"
              : undefined
          }
        >
          <TableRowLabel {...rowLabel("tps")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                data.tps > 0 ? (
                  <TableValue compact={formatCompact(data.tps)} full={formatFull(data.tps)} />
                ) : (
                  "—"
                )
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>
            {totalTps > 0 ? (
              <TableValue compact={formatCompact(totalTps)} full={formatFull(totalTps)} />
            ) : (
              "—"
            )}
          </TableTotalCell>
        </TableRow>

        {}
        <TableRow>
          <TableRowLabel {...rowLabel("casts")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>{data.skill ? data.casts : "—"}</TableCell>
          ))}
          <TableTotalCell>{totalCasts}</TableTotalCell>
        </TableRow>
        <TableRow
          className={
            primaryRows?.includes("uptime")
              ? "font-bold [&_td]:text-inherit [&_td_button]:text-inherit"
              : undefined
          }
        >
          <TableRowLabel {...rowLabel("uptime")} />
          {slotData.map((data) => (
            <TableCell key={data.slotId}>
              {data.skill ? (
                <TableValue
                  compact={formatPercent(data.uptime * 100)}
                  full={formatPercentFull(data.uptime * 100)}
                />
              ) : (
                "—"
              )}
            </TableCell>
          ))}
          <TableTotalCell>—</TableTotalCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
