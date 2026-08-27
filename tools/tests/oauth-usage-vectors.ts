
export type Transport =
  | { readonly kind: "body"; readonly status: number; readonly json: unknown }
  | { readonly kind: "text"; readonly status: number; readonly text: string }
  | { readonly kind: "throws" }

export const GOOD_BODY = {
  five_hour: { utilization: 7, resets_at: "2026-07-18T10:09:59Z", limit_dollars: null },
  seven_day: { utilization: 44, resets_at: "2026-07-18T09:59:59Z" },
  seven_day_opus: null,
  limits: [{ kind: "session", percent: 0 }],
}

export const FIXED_NOW = 1_770_000_000_000

export const FAR_NOW = 8_640_000_000_000_000

export const PAGED_ACCOUNTS = ["acct", "audhdalan"] as const

export interface ParseVector {
  readonly label: string
  readonly raw: unknown
}

export function parseVectors(): ParseVector[] {
  const window = (u: unknown, r: unknown) => ({ utilization: u, resets_at: r })
  const both = (five: unknown, seven: unknown) => ({ five_hour: five, seven_day: seven })
  return [
    { label: "valid|siblings", raw: GOOD_BODY },
    { label: "valid|zero", raw: both(window(0, null), window(0, "2026-07-18T09:59:59Z")) },
    { label: "valid|hundred", raw: both(window(100, "2026-07-18T10:09:59Z"), window(100, null)) },
    { label: "valid|fraction", raw: both(window(61.5, null), window(0.001, null)) },
    { label: "valid|negative", raw: both(window(-1, null), window(-100, null)) },
    { label: "valid|extra-top-level", raw: { ...both(window(1, null), window(2, null)), spend: { usd: 3 } } },
    { label: "refused|five-hour-util-absent", raw: both({ resets_at: null }, window(1, null)) },
    { label: "refused|seven-day-util-absent", raw: both(window(1, null), { resets_at: null }) },
    { label: "refused|util-null", raw: both(window(null, null), window(1, null)) },
    { label: "refused|util-string", raw: both(window("44", null), window(1, null)) },
    { label: "refused|util-nan", raw: both(window(Number.NaN, null), window(1, null)) },
    { label: "refused|util-infinity", raw: both(window(Number.POSITIVE_INFINITY, null), window(1, null)) },
    { label: "refused|util-bool", raw: both(window(true, null), window(1, null)) },
    { label: "refused|resets-number", raw: both(window(1, 1770000000000), window(1, null)) },
    { label: "refused|resets-absent", raw: both({ utilization: 1 }, window(1, null)) },
    { label: "refused|five-hour-missing", raw: { seven_day: window(1, null) } },
    { label: "refused|seven-day-missing", raw: { five_hour: window(1, null) } },
    { label: "refused|five-hour-null", raw: both(null, window(1, null)) },
    { label: "refused|five-hour-array", raw: both([], window(1, null)) },
    { label: "refused|empty-object", raw: {} },
    { label: "refused|null", raw: null },
    { label: "refused|undefined", raw: undefined },
    { label: "refused|string", raw: "nope" },
    { label: "refused|number", raw: 7 },
    { label: "refused|bool", raw: false },
    { label: "refused|array", raw: [GOOD_BODY] },
  ]
}

export interface FetchVector {
  readonly label: string
  readonly accessToken: string
  readonly transport: Transport
}

export function fetchVectors(): FetchVector[] {
  const out: FetchVector[] = []
  for (const status of [200, 201, 226, 204, 299, 300, 301, 400, 401, 403, 404, 418, 429, 500, 502, 503]) {
    out.push({
      label: `status|${status}`,
      accessToken: "tok",
      transport:
        status === 204
          ? { kind: "text", status, text: "" }
          : { kind: "body", status, json: GOOD_BODY },
    })
  }
  out.push({ label: "malformed|util-absent", accessToken: "tok", transport: { kind: "body", status: 200, json: { five_hour: { resets_at: null }, seven_day: { utilization: 1, resets_at: null } } } })
  out.push({ label: "malformed|window-missing", accessToken: "tok", transport: { kind: "body", status: 200, json: { five_hour: { utilization: 1, resets_at: null } } } })
  out.push({ label: "nonjson|html", accessToken: "tok", transport: { kind: "text", status: 200, text: "<html>gateway</html>" } })
  out.push({ label: "nonjson|empty", accessToken: "tok", transport: { kind: "text", status: 200, text: "" } })
  out.push({ label: "nonjson|truncated", accessToken: "tok", transport: { kind: "text", status: 200, text: '{"five_hour":' } })
  out.push({ label: "json|bare-null", accessToken: "tok", transport: { kind: "text", status: 200, text: "null" } })
  out.push({ label: "throws|network", accessToken: "tok", transport: { kind: "throws" } })
  out.push({ label: "token|blank", accessToken: "", transport: { kind: "body", status: 200, json: GOOD_BODY } })
  out.push({ label: "token|unicode", accessToken: "sk-ünïcødé", transport: { kind: "body", status: 200, json: GOOD_BODY } })
  return out
}

export interface PacingVector {
  readonly label: string
  readonly now: number
  readonly account: string
  readonly fiveHourUtil: number
  readonly fiveHourResetsAt: string | null
  readonly sevenDayUtil: number
  readonly sevenDayResetsAt: string | null
  readonly logPrefix: string | undefined
  readonly writeThrows: boolean
}

export function pacingVectors(): PacingVector[] {
  const out: PacingVector[] = []
  const resets: (string | null)[] = [
    null,
    "2026-07-18T09:59:59Z",
    "2026-02-02T00:00:00.000Z",
    "1970-01-01T00:00:00.000Z",
    "2026-02-08T12:00:00.000Z",
  ]
  for (const now of [0, FIXED_NOW, 1_770_400_000_000]) {
    for (const util of [0, 44, 99.9, 100]) {
      for (const reset of resets) {
        out.push({
          label: `pacing|${now}|${util}|${reset ?? "<null>"}`,
          now,
          account: "acct",
          fiveHourUtil: util === 100 ? 0 : util,
          fiveHourResetsAt: reset,
          sevenDayUtil: util,
          sevenDayResetsAt: reset,
          logPrefix: undefined,
          writeThrows: false,
        })
      }
    }
  }
  for (const logPrefix of [undefined, "", "[pacing]"]) {
    out.push({
      label: `pacing|throws|${logPrefix ?? "<undef>"}`,
      now: FIXED_NOW,
      account: "acct",
      fiveHourUtil: 3,
      fiveHourResetsAt: null,
      sevenDayUtil: 44,
      sevenDayResetsAt: "2026-07-18T09:59:59Z",
      logPrefix,
      writeThrows: true,
    })
  }
  return out
}

export interface MarkVector {
  readonly label: string
  readonly now: number
  readonly account: string
  readonly retryAfterHeader: string | null
  readonly logPrefix: string | undefined
  readonly writeThrows: boolean
}

const HEADERS: (string | null)[] = [
  null,
  "",
  "   ",
  "0",
  "-5",
  "1",
  "120",
  "17999",
  "18000",
  "18001",
  "259200",
  "abc",
  "NaN",
  "Infinity",
  "1e3",
  "Wed, 21 Oct 2015 07:28:00 GMT",
]

export function markVectors(): MarkVector[] {
  const out: MarkVector[] = []
  for (const header of HEADERS) {
    out.push({
      label: `header|${header ?? "<null>"}`,
      now: FIXED_NOW,
      account: "acct",
      retryAfterHeader: header,
      logPrefix: undefined,
      writeThrows: false,
    })
  }
  for (const now of [0, 1, FIXED_NOW, FAR_NOW]) {
    out.push({ label: `now|${now}`, now, account: "acct", retryAfterHeader: "120", logPrefix: undefined, writeThrows: false })
    out.push({ label: `now|${now}|nohdr`, now, account: "acct", retryAfterHeader: null, logPrefix: undefined, writeThrows: false })
  }
  for (const logPrefix of [undefined, "", "[proxy]"]) {
    out.push({ label: `prefix|${logPrefix ?? "<undef>"}`, now: FIXED_NOW, account: "acct", retryAfterHeader: "120", logPrefix, writeThrows: false })
    out.push({ label: `prefix|${logPrefix ?? "<undef>"}|throws`, now: FIXED_NOW, account: "acct", retryAfterHeader: "120", logPrefix, writeThrows: true })
  }
  out.push({ label: "account|other", now: FIXED_NOW, account: "audhdalan", retryAfterHeader: "60", logPrefix: undefined, writeThrows: false })
  out.push({ label: "account|blank", now: FIXED_NOW, account: "", retryAfterHeader: "60", logPrefix: undefined, writeThrows: false })
  return out
}
