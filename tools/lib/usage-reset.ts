
export const MS_PER_HOUR = 60 * 60 * 1000

export const HOURS_FALLBACK = 144

function parseResetMs(reset: string | null): number | null {
  if (reset == null) return null
  const t = new Date(reset).getTime()
  return Number.isNaN(t) ? null : t
}

export function hoursUntilReset(args: {
  readonly now: number
  readonly sevenDayResetsAt: string | null
}): number {
  const resetMs = parseResetMs(args.sevenDayResetsAt)
  if (resetMs == null) return HOURS_FALLBACK
  const rawMs = resetMs - args.now
  if (rawMs <= 0) return HOURS_FALLBACK
  return rawMs / MS_PER_HOUR
}
