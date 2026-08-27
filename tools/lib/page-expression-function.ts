import { ExpressionRefused, listed, shown, truthy, type Value } from "./page-expression-value.ts"

export const ARITY: Readonly<Record<string, number>> = {
  now: 0,
  today: 0,
  resetInstant: 0,
  count: 1,
  toCalendarDate: 1,
  toEsoDay: 1,
  parseCalendarDate: 1,
  parseInstant: 1,
  timeOfDay: 1,
  max: 2,
  min: 2,
  contains: 2,
  containsText: 2,
  joinPath: 2,
  recurrence: 2,
  addDays: 2,
  daysBetween: 2,
  if: 3,
  dayOfCycle: 3,
}

const CALENDAR_DATE = /^\d{4}-\d{2}-\d{2}$/

const MS_PER_DAY = 86_400_000

function finite(name: string, arg: string, value: Value): number | null {
  if (value === null) return null
  if (typeof value === "number" && Number.isFinite(value)) return value
  throw new ExpressionRefused(
    `\`${name}\` reads a finite number for \`${arg}\`, and it is given ${shown(value)}`,
    "function_argument_type_error"
  )
}

function texted(name: string, arg: string, value: Value): string {
  if (typeof value === "string") return value
  throw new ExpressionRefused(
    `\`${name}\` reads text for \`${arg}\`, and it is given ${shown(value)}`,
    "function_argument_type_error"
  )
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

function dayText(ms: number): string {
  const day = new Date(ms)
  return `${day.getUTCFullYear()}-${pad2(day.getUTCMonth() + 1)}-${pad2(day.getUTCDate())}`
}

function dated(name: string, arg: string, value: Value): number | null {
  if (value === null) return null
  if (typeof value !== "string") {
    throw new ExpressionRefused(
      `\`${name}\` reads text for \`${arg}\`, and it is given ${shown(value)}`,
      "function_argument_type_error"
    )
  }
  if (!CALENDAR_DATE.test(value)) {
    throw new ExpressionRefused(
      `\`${name}\` reads a \`YYYY-MM-DD\` date for \`${arg}\`, and it is given the text \`${value}\``,
      "function_argument_type_error"
    )
  }
  const parts = value.split("-").map(Number)
  const ms = Date.UTC(parts[0] as number, (parts[1] as number) - 1, parts[2] as number)
  if (!Number.isFinite(ms)) {
    throw new ExpressionRefused(
      `\`${name}\` reads a \`YYYY-MM-DD\` date for \`${arg}\`, and \`${value}\` falls outside the range a date holds`,
      "function_argument_type_error"
    )
  }
  return ms
}

function counted(name: string, arg: string, value: Value): number | null {
  if (value === null) return null
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new ExpressionRefused(
      `\`${name}\` reads a finite number for \`${arg}\`, and it is given ${shown(value)}`,
      "function_argument_type_error"
    )
  }
  if (!Number.isInteger(value)) {
    throw new ExpressionRefused(
      `\`${name}\` reads a whole number for \`${arg}\`, and it is given \`${value}\``,
      "function_argument_type_error"
    )
  }
  if (value < 0) {
    throw new ExpressionRefused(
      `\`${name}\` reads a number of zero or more for \`${arg}\`, and it is given \`${value}\``,
      "function_argument_type_error"
    )
  }
  return value
}

function callIf(args: readonly Value[]): Value {
  return truthy(args[0] ?? null) ? (args[1] ?? null) : (args[2] ?? null)
}

function callMax(args: readonly Value[]): Value {
  return Math.max(finite("max", "a", args[0] ?? null) ?? 0, finite("max", "b", args[1] ?? null) ?? 0)
}

function callMin(args: readonly Value[]): Value {
  return Math.min(finite("min", "a", args[0] ?? null) ?? 0, finite("min", "b", args[1] ?? null) ?? 0)
}

function callContainsText(args: readonly Value[]): Value {
  const haystack = args[0] ?? null
  const needle = args[1] ?? null
  if (haystack === null || needle === null) return null
  const held = texted("containsText", "haystack", haystack).toLowerCase()
  return held.includes(texted("containsText", "needle", needle).toLowerCase())
}

function callCount(args: readonly Value[]): Value {
  const of = args[0] ?? null
  if (of === null) return 0
  const list = listed(of)
  if (list === null) {
    throw new ExpressionRefused(`\`count\` reads a list, and it is given ${shown(of)}`, "function_argument_type_error")
  }
  return list.length
}

function callContains(args: readonly Value[]): Value {
  const of = args[0] ?? null
  const needle = args[1] ?? null
  if (of === null) return null
  const list = listed(of)
  if (list === null) {
    throw new ExpressionRefused(`\`contains\` reads a list, and it is given ${shown(of)}`, "function_argument_type_error")
  }
  return list.some(function isNeedle(item) {
    return item === needle
  })
}

function callJoinPath(args: readonly Value[]): Value {
  const card = args[0] ?? null
  const path = args[1] ?? null
  if (card === null) return null
  const id = texted("joinPath", "cardId", card)
  if (path === null) return id
  const list = listed(path)
  if (list === null) {
    throw new ExpressionRefused(
      `\`joinPath\` reads a list or null for \`itemPath\`, and it is given ${shown(path)}`,
      "function_argument_type_error"
    )
  }
  if (list.length === 0) return id
  return `${id}/${list.map(String).join("/")}`
}

function callToCalendarDate(args: readonly Value[]): Value {
  const ms = finite("toCalendarDate", "msEpoch", args[0] ?? null)
  if (ms === null) return null
  return dayText(ms)
}

function callParseCalendarDate(args: readonly Value[]): Value {
  return dated("parseCalendarDate", "dateString", args[0] ?? null)
}

function callParseInstant(args: readonly Value[]): Value {
  const raw = args[0] ?? null
  if (raw === null) return null
  if (typeof raw === "number" && Number.isFinite(raw)) return raw
  if (typeof raw !== "string") {
    throw new ExpressionRefused(
      `\`parseInstant\` reads an ISO-8601 instant or epoch milliseconds, and it is given ${shown(raw)}`,
      "function_argument_type_error"
    )
  }
  const ms = Date.parse(raw)
  if (Number.isNaN(ms)) {
    throw new ExpressionRefused(
      `\`parseInstant\` cannot read the text \`${raw}\` as an ISO-8601 instant`,
      "function_argument_type_error"
    )
  }
  return ms
}

function callTimeOfDay(args: readonly Value[]): Value {
  const ms = finite("timeOfDay", "msEpoch", args[0] ?? null)
  if (ms === null) return null
  const at = new Date(ms)
  return `${pad2(at.getUTCHours())}:${pad2(at.getUTCMinutes())}`
}

function callAddDays(args: readonly Value[]): Value {
  const dateMs = dated("addDays", "dateString", args[0] ?? null)
  const count = finite("addDays", "n", args[1] ?? null)
  if (dateMs === null || count === null) return null
  return dayText(dateMs + Math.round(count) * MS_PER_DAY)
}

function callDaysBetween(args: readonly Value[]): Value {
  const startMs = dated("daysBetween", "startDateString", args[0] ?? null)
  const endMs = dated("daysBetween", "endDateString", args[1] ?? null)
  if (startMs === null || endMs === null) return null
  return Math.round((endMs - startMs) / MS_PER_DAY)
}

function callDayOfCycle(args: readonly Value[]): Value {
  const dateMs = dated("dayOfCycle", "dateString", args[0] ?? null)
  const epochMs = dated("dayOfCycle", "epochDateString", args[1] ?? null)
  const length = counted("dayOfCycle", "cycleLength", args[2] ?? null)
  if (dateMs === null || epochMs === null || length === null) return null
  if (length === 0) {
    throw new ExpressionRefused(
      "`dayOfCycle` reads a cycle length above zero, and it is given `0`",
      "divide_by_zero"
    )
  }
  const days = Math.round((dateMs - epochMs) / MS_PER_DAY)
  return ((days % length) + length) % length
}

function callNow(): Value {
  return Date.now()
}

export const CALLS: Readonly<Record<string, (args: readonly Value[]) => Value>> = {
  now: callNow,
  if: callIf,
  max: callMax,
  min: callMin,
  contains: callContains,
  containsText: callContainsText,
  count: callCount,
  joinPath: callJoinPath,
  toCalendarDate: callToCalendarDate,
  parseCalendarDate: callParseCalendarDate,
  parseInstant: callParseInstant,
  timeOfDay: callTimeOfDay,
  addDays: callAddDays,
  daysBetween: callDaysBetween,
  dayOfCycle: callDayOfCycle,
}
