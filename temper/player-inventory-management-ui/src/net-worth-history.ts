export interface NetWorthHistoryRow {
  id: string
  date: number
  netWorth: number
}

export interface NetWorthDayPoint {
  readonly date: string
  readonly dateEpoch: number
  readonly netWorth: number
}

export function toNetWorthHistory(
  rows: readonly Record<string, unknown>[]
): readonly NetWorthHistoryRow[] {
  return rows
    .map((row) => ({
      id: typeof row.id === "string" ? row.id : "",
      date: typeof row.dataTimestamp === "number" ? row.dataTimestamp : 0,
      netWorth: typeof row.totalValue === "number" ? row.totalValue : 0,
    }))
    .sort((a, b) => a.date - b.date)
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function toDayString(epochMs: number): string {
  return new Date(epochMs).toISOString().slice(0, 10)
}

export function formatDayLabel(date: string): string {
  const [, month, day] = date.split("-")
  return `${MONTH_NAMES[Number(month) - 1]} ${Number(day)}`
}

export function toDailyCloses(history: readonly NetWorthHistoryRow[]): readonly NetWorthDayPoint[] {
  const byDay = new Map<string, NetWorthDayPoint>()
  for (const row of history) {
    const date = toDayString(row.date)
    byDay.set(date, { date, dateEpoch: row.date, netWorth: row.netWorth })
  }
  return [...byDay.values()]
}

export interface GuildBankBasisChange {
  readonly since: number
  readonly latestValue: number
}

export function toGuildBankBasisChange(
  rows: readonly Record<string, unknown>[]
): GuildBankBasisChange | null {
  const stamped = rows.flatMap((row) =>
    typeof row.dataTimestamp === "number" ? [{ at: row.dataTimestamp, row }] : []
  )
  const measured = stamped
    .flatMap(({ at, row }) =>
      typeof row.excludedGuildBankValue === "number"
        ? [{ at, value: row.excludedGuildBankValue }]
        : []
    )
    .sort((a, b) => a.at - b.at)
  const earliest = measured[0]
  const latest = measured.at(-1)
  if (earliest === undefined || latest === undefined) return null
  if (!stamped.some(({ at }) => at < earliest.at)) return null
  return { since: earliest.at, latestValue: latest.value }
}
