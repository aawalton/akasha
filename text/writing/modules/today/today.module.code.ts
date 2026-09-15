export function daysAgoYYYYMMDD(days: number): string {
  const now = new Date()
  now.setUTCDate(now.getUTCDate() - days)
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, "0")
  const d = String(now.getUTCDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function todayYYYYMMDD(): string {
  return daysAgoYYYYMMDD(0)
}
