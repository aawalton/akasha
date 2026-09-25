import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const GROUP = 3

const THOUSAND = 1000

const ONE_DECIMAL_THOUSANDS_BELOW = 10000

const MILLION = 1000000

const ONE_DECIMAL_MILLIONS_BELOW = 10000000

const PERCENT = 100

const PERCENT_PLACES = 2

const SMALL_PLACES = 4

const MINUTE = 60

const HOUR = 3600

const TWO_DIGITS = 10

function roundedOf(value: number): number {
  return math.floor(value + 0.5)
}

function trimmedZeros(written: string): string {
  if (!written.includes(".")) return written
  let trimmed = written
  while (trimmed.endsWith("0")) trimmed = trimmed.slice(0, -1)
  if (trimmed.endsWith(".")) trimmed = trimmed.slice(0, -1)
  return trimmed
}

function grouped(whole: number): string {
  const digits = string.format("%d", math.abs(whole))
  let out = ""
  const length = digits.length
  for (let at = 0; at < length; at += 1) {
    const left = length - at
    out = out + digits.charAt(at)
    if (left > 1 && (left - 1) % GROUP === 0) out = out + ","
  }
  return whole < 0 ? `-${out}` : out
}

export function formatCount(value: number): string {
  return grouped(roundedOf(value))
}

export function formatGold(value: number): string {
  return `${formatCount(value)}g`
}

export function formatCompact(value: number): string {
  const size = math.abs(value)
  const sign = value < 0 ? "-" : ""
  if (size < THOUSAND) return `${sign}${roundedOf(size)}`
  if (size < ONE_DECIMAL_THOUSANDS_BELOW) return `${sign}${string.format("%.1f", size / THOUSAND)}K`
  if (size < MILLION) return `${sign}${roundedOf(size / THOUSAND)}K`
  if (size < ONE_DECIMAL_MILLIONS_BELOW) return `${sign}${string.format("%.1f", size / MILLION)}M`
  return `${sign}${roundedOf(size / MILLION)}M`
}

export function formatPercent(fraction: number): string {
  return `${trimmedZeros(string.format(`%.${PERCENT_PLACES}f`, fraction * PERCENT))}%`
}

export function formatDecimal(value: number): string {
  if (value === 0) return "0"
  if (math.abs(value) < 1) return trimmedZeros(string.format(`%.${SMALL_PLACES}f`, value))
  return formatCount(value)
}

function twoDigits(value: number): string {
  return value < TWO_DIGITS ? `0${value}` : `${value}`
}

export function formatDuration(seconds: number): string {
  const whole = math.max(0, math.floor(seconds))
  const hours = math.floor(whole / HOUR)
  const minutes = math.floor((whole % HOUR) / MINUTE)
  const secs = whole % MINUTE
  if (hours > 0) return `${hours}:${twoDigits(minutes)}:${twoDigits(secs)}`
  return `${twoDigits(minutes)}:${twoDigits(secs)}`
}

const DAY = 86400

export function formatDaySpan(seconds: number): string {
  const whole = math.max(0, math.floor(seconds))
  const days = math.floor(whole / DAY)
  const hours = math.floor((whole % DAY) / HOUR)
  const minutes = math.floor((whole % HOUR) / MINUTE)
  return `${days}d ${hours}h ${minutes}m`
}

export function formatSeconds(seconds: number): string {
  return `${trimmedZeros(string.format("%.2f", math.max(0, seconds)))} s`
}

export function formatRate(value: number, unit: string): string {
  return `${formatCount(math.max(0, value))} ${unit}`
}
