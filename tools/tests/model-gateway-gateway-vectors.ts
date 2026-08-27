import { fakeOAuthEffects } from "../lib/model-gateway/_oauth-effects-test-helpers.ts"

export interface Tracker {
  begin: () => void
  end: () => void
  whenIdle: (timeoutMs: number) => Promise<{ idle: boolean }>
  getCount: () => number
}

export interface Proxy {
  port: number
  stop: () => void
  flushAll: (reason: string) => void
}

export interface CoreModule {
  buildInFlightTracker: () => Tracker
  startOAuthProxy: (opts: Record<string, unknown>) => Proxy
}

export type Answer = Record<string, unknown>

export interface Row {
  readonly k: string
  readonly answer: Answer
}

export interface Answered {
  readonly rows: readonly Row[]
  readonly consoleRestored: boolean
  readonly timersRestored: boolean
}

interface Timers {
  readonly delays: () => readonly number[]
  readonly restore: () => undefined
  readonly isRestored: () => boolean
}

let watchesOutstanding = 0

function watchTimers(): Timers {
  const real = globalThis.setTimeout
  const delays: number[] = []
  watchesOutstanding += 1
  globalThis.setTimeout = ((handler: TimerHandler, ms?: number, ...rest: unknown[]) => {
    delays.push(ms ?? 0)
    return (real as (...a: unknown[]) => unknown)(handler, ms, ...rest)
  }) as unknown as typeof globalThis.setTimeout
  return {
    delays: () => delays,
    restore: (): undefined => {
      globalThis.setTimeout = real
      watchesOutstanding -= 1
    },
    isRestored: () => globalThis.setTimeout === real,
  }
}

interface Quiet {
  readonly restore: () => undefined
  readonly isRestored: () => boolean
}

function quieten(): Quiet {
  const realLog = console.log
  const realError = console.error
  console.log = (): undefined => undefined
  console.error = (): undefined => undefined
  return {
    restore: (): undefined => {
      console.log = realLog
      console.error = realError
    },
    isRestored: () => console.log === realLog && console.error === realError,
  }
}

interface TrackerCase {
  readonly label: string
  readonly run: (m: CoreModule) => Promise<Answer>
}

const TRACKER_CASES: readonly TrackerCase[] = [
  {
    label: "tracker/the-count-follows-begin-and-end",
    run: async (m) => {
      const t = m.buildInFlightTracker()
      const seen = [t.getCount()]
      t.begin()
      seen.push(t.getCount())
      t.begin()
      seen.push(t.getCount())
      t.end()
      seen.push(t.getCount())
      t.end()
      seen.push(t.getCount())
      return { seen }
    },
  },
  {
    label: "tracker/an-end-below-zero-clamps-rather-than-going-negative",
    run: async (m) => {
      const t = m.buildInFlightTracker()
      t.end()
      const afterFirstEnd = t.getCount()
      t.end()
      const afterSecondEnd = t.getCount()
      t.begin()
      const afterBegin = t.getCount()
      return { afterFirstEnd, afterSecondEnd, afterBegin }
    },
  },
  {
    label: "tracker/idle-at-zero-answers-true-with-no-timer-scheduled",
    run: async (m) => {
      const timers = watchTimers()
      try {
        const t = m.buildInFlightTracker()
        const answer = await t.whenIdle(2_000)
        return { idle: answer.idle, delays: [...timers.delays()] }
      } finally {
        timers.restore()
      }
    },
  },
  {
    label: "tracker/a-drain-answers-every-waiter-that-is-still-waiting",
    run: async (m) => {
      const t = m.buildInFlightTracker()
      t.begin()
      const first = t.whenIdle(2_000)
      const second = t.whenIdle(2_000)
      t.end()
      const both = await Promise.all([first, second])
      return { idle: both.map((one) => one.idle), count: t.getCount() }
    },
  },
  {
    label: "tracker/the-ceiling-answers-false-and-is-the-timeout-it-was-given",
    run: async (m) => {
      const timers = watchTimers()
      try {
        const t = m.buildInFlightTracker()
        t.begin()
        const answer = await t.whenIdle(15)
        return { idle: answer.idle, count: t.getCount(), delays: [...timers.delays()] }
      } finally {
        timers.restore()
      }
    },
  },
  {
    label: "tracker/a-waiter-that-timed-out-does-not-answer-again-on-the-drain",
    run: async (m) => {
      const t = m.buildInFlightTracker()
      t.begin()
      const timedOut = await t.whenIdle(15)
      t.end()
      const afterDrain = t.getCount()
      const fresh = await t.whenIdle(2_000)
      return { timedOut: timedOut.idle, afterDrain, fresh: fresh.idle }
    },
  },
  {
    label: "tracker/two-trackers-do-not-share-a-count",
    run: async (m) => {
      const left = m.buildInFlightTracker()
      const right = m.buildInFlightTracker()
      left.begin()
      left.begin()
      right.begin()
      return { left: left.getCount(), right: right.getCount() }
    },
  },
]

interface RouteCase {
  readonly label: string
  readonly path: string
  readonly method: string
}

const ROUTE_CASES: readonly RouteCase[] = [
  { label: "route/head-slash-is-served-here", path: "/", method: "HEAD" },
  { label: "route/get-slash-is-not-head-slash", path: "/", method: "GET" },
  { label: "route/get-healthz-is-served-here", path: "/healthz", method: "GET" },
  { label: "route/post-healthz-is-not-get-healthz", path: "/healthz", method: "POST" },
  { label: "route/get-inflight-is-served-here", path: "/inflight", method: "GET" },
  { label: "route/post-inflight-is-not-get-inflight", path: "/inflight", method: "POST" },
  { label: "route/get-rc-status-is-served-here", path: "/rc-status", method: "GET" },
  { label: "route/post-rc-status-is-not-get-rc-status", path: "/rc-status", method: "POST" },
  { label: "route/post-v1-messages-reaches-the-upstream", path: "/v1/messages", method: "POST" },
  {
    label: "route/post-count-tokens-reaches-the-upstream",
    path: "/v1/messages/count_tokens",
    method: "POST",
  },
  { label: "route/get-v1-messages-is-not-post-v1-messages", path: "/v1/messages", method: "GET" },
  { label: "route/a-path-nothing-claims-reaches-the-upstream", path: "/v1/models", method: "GET" },
  { label: "route/a-query-string-is-carried-to-the-upstream", path: "/v1/models?a=1", method: "GET" },
]

const CRED = {
  account: "acct-1",
  accessToken: "token-acct-1",
  refreshToken: "refresh",
  expiresAt: 4_102_444_800_000,
  scopes: [] as readonly string[],
  subscriptionType: null,
  rateLimitTier: null,
}

const OAUTH = fakeOAuthEffects({
  getBestCredential: async () => ({
    credential: CRED,
    fiveHourResetsAtMs: null,
  }),
  getCredentialByAccount: async () => CRED,
  markAccountAtLimit: async () => undefined,
  repollUsageAfter429: async () => undefined,
})

async function drivenRoutes(m: CoreModule): Promise<Row[]> {
  const realFetch = globalThis.fetch
  const seen: string[] = []
  const stub = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = input instanceof Request ? input.url : String(input)
    if (!url.startsWith("https://api.anthropic.com")) return realFetch(input, init)
    const headers = new Headers(init?.headers ?? {})
    const auth = headers.get("authorization")
    const body = init?.body
    const bytes = body instanceof ArrayBuffer ? body.byteLength : body == null ? -1 : -2
    seen.push(`${init?.method ?? "GET"} ${url} auth=${auth ?? "none"} body=${bytes}`)
    return Promise.resolve(new Response("upstream-default", { status: 203 }))
  }
  globalThis.fetch = Object.assign(stub, { preconnect: () => {} }) as unknown as typeof fetch
  const proxy = m.startOAuthProxy({ oauth: OAUTH, port: 0, logPrefix: "[vectors]" })
  const rows: Row[] = []
  try {
    for (const one of ROUTE_CASES) {
      seen.length = 0
      const res = await realFetch(`http://localhost:${proxy.port}${one.path}`, {
        method: one.method,
        body: one.method === "POST" ? '{"model":"m","messages":[]}' : undefined,
      })
      rows.push({
        k: one.label,
        answer: {
          status: res.status,
          contentType: res.headers.get("content-type"),
          body: await res.text(),
          upstream: [...seen],
        },
      })
    }
  } finally {
    proxy.stop()
    globalThis.fetch = realFetch
  }
  return rows
}

export function coreCaseCount(): number {
  return TRACKER_CASES.length + ROUTE_CASES.length
}

export function coreCases(): readonly { label: string }[] {
  return [...TRACKER_CASES.map((one) => ({ label: one.label })), ...ROUTE_CASES]
}

export async function answeredCore(m: CoreModule): Promise<Answered> {
  const quiet = quieten()
  const rows: Row[] = []
  try {
    for (const one of TRACKER_CASES) {
      try {
        rows.push({ k: one.label, answer: await one.run(m) })
      } catch (err) {
        rows.push({ k: one.label, answer: { armThrew: String(err) } })
      }
    }
    try {
      rows.push(...(await drivenRoutes(m)))
    } catch (err) {
      rows.push({ k: "route/*", answer: { armThrew: String(err) } })
    }
  } finally {
    quiet.restore()
  }
  return {
    rows,
    consoleRestored: quiet.isRestored(),
    timersRestored: watchesOutstanding === 0,
  }
}
