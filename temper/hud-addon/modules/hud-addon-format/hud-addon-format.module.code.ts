export function formatFramerate(fps: number): string {
  return `${Math.max(0, Math.round(fps))} fps`
}

export function formatLatency(ms: number): string {
  return `${Math.max(0, Math.round(ms))} ms`
}

export function formatDuration(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds))
  const hours = Math.floor(whole / 3600)
  const minutes = Math.floor((whole % 3600) / 60)
  const secs = whole % 60
  const mm = minutes < 10 ? `0${minutes}` : `${minutes}`
  const ss = secs < 10 ? `0${secs}` : `${secs}`
  if (hours > 0) return `${hours}:${mm}:${ss}`
  return `${mm}:${ss}`
}
