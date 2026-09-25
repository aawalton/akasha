export function ago(iso: string | null): string {
  const said = formatTimeAgo(iso)
  return said === "" ? "" : ` ${said}`
}

export function formatTimeAgo(date: Date | string | null, now: Date = new Date()): string {
  if (date === null) return ""
  const then = typeof date === "string" ? new Date(date) : date
  if (Number.isNaN(then.getTime())) return ""
  const diffMs = now.getTime() - then.getTime()

  if (diffMs < 0) {
    return "Just now"
  }

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return "Just now"
  }

  if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`
  }

  if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`
  }

  return days === 1 ? "1 day ago" : `${days} days ago`
}
