import { formatGold } from "@shared/design-primitives/utils/format-gold"
import { formatDayLabel, type NetWorthHistoryRow, toDayString } from "./net-worth-history"

const MS_PER_DAY = 86_400_000

export interface NetWorthPeriod {
  readonly label: string
  readonly days: number
}

export const NET_WORTH_PERIODS: readonly NetWorthPeriod[] = [
  { label: "1d", days: 1 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "365d", days: 365 },
]

export const NET_WORTH_MAX_PERIOD_DAYS = 365

export type NetWorthPeriodReading =
  | {
      readonly label: string
      readonly state: "measured"
      readonly diff: number
      readonly percent: number | null
      readonly comparedAt: number
      readonly onHorizon: boolean
    }
  | { readonly label: string; readonly state: "unmeasured" }

export function readNetWorthPeriods(
  history: readonly NetWorthHistoryRow[],
  periods: readonly NetWorthPeriod[] = NET_WORTH_PERIODS
): readonly NetWorthPeriodReading[] {
  const latest = history.at(-1)
  if (latest === undefined) {
    return periods.map((period) => ({ label: period.label, state: "unmeasured" }))
  }
  return periods.map((period) => {
    const horizon = latest.date - period.days * MS_PER_DAY
    const point = history.findLast((row) => row.date <= horizon)
    if (point === undefined) return { label: period.label, state: "unmeasured" }
    const diff = latest.netWorth - point.netWorth
    return {
      label: period.label,
      state: "measured",
      diff,
      percent: point.netWorth === 0 ? null : Math.round((diff / point.netWorth) * 100),
      comparedAt: point.date,
      onHorizon: toDayString(point.date) === toDayString(horizon),
    }
  })
}

export const NET_WORTH_PERIOD_UNMEASURED_TEXT = "not enough history"

export function formatPeriodAmount(diff: number): string {
  if (diff === 0) return formatGold(0)
  return `${diff > 0 ? "+" : "-"}${formatGold(Math.abs(diff))}`
}

export function formatPeriodPercent(percent: number | null): string | null {
  if (percent === null) return null
  return `(${percent > 0 ? "+" : ""}${percent}%)`
}

export function formatPeriodComparedAt(comparedAt: number): string {
  return `since ${formatDayLabel(toDayString(comparedAt))}`
}
