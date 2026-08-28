
import type { Transport } from "./oauth-usage-vectors.ts"

export interface PageSeam {
  pacing: (args: { pagePath: string; values: Record<string, unknown> }) => void
  mark: (args: { account: string; marks: Record<string, string | null> }) => void
}

export const seam: PageSeam = {
  pacing: () => {},
  mark: () => {},
}

export interface Cred {
  account: string
  accessToken: string
  refreshToken: string
  expiresAt: number
  scopes: readonly string[]
  subscriptionType: string | null
  rateLimitTier: string | null
}

export interface Bound {
  parseUsageResponse: (raw: unknown) => unknown
  fetchUsage: (accessToken: string) => Promise<unknown>
  pushPacingToPage: (account: string, usage: unknown, logPrefix?: string) => Promise<void>
  markAccountAtLimit: (args: {
    account: string
    retryAfterHeader: string | null
    logPrefix?: string
  }) => Promise<void>
  repollUsageAfter429: (
    account: string,
    getToken: (account: string) => Promise<Cred | null>,
    logPrefix?: string
  ) => Promise<void>
  resetRepollGateForTests: () => void
}

export interface Request {
  url: string
  authorization: string | null
  headers: [string, string][]
  hasSignal: boolean
}

type Logged = { stream: "log" | "error"; text: string; err: unknown }

const MALFORMED = "Usage response malformed: "

export function spellError(err: unknown): unknown {
  if (!(err instanceof Error)) return { kind: "not-an-error", text: String(err) }
  const status = (err as { status?: unknown }).status
  const message = err.message.startsWith(MALFORMED)
    ? `${MALFORMED}<validator text, ${err.message.length > MALFORMED.length ? "non-empty" : "EMPTY"}>`
    : err.message
  return { name: err.name, message, status: status === undefined ? "<absent>" : status }
}

function respond(transport: Transport): Response {
  if (transport.kind === "throws") throw new Error("network down")
  if (transport.kind === "text") {
    return new Response(transport.text === "" ? null : transport.text, { status: transport.status })
  }
  return new Response(JSON.stringify(transport.json), { status: transport.status })
}

export function stubFetch(plan: () => Transport, into: Request[]): typeof fetch {
  const handler = async (input: Parameters<typeof fetch>[0], init?: RequestInit): Promise<Response> => {
    const headers = new Headers(init?.headers)
    into.push({
      url: typeof input === "string" ? input : String(input),
      authorization: headers.get("Authorization"),
      headers: [...headers.entries()].sort(([l], [r]) => (l < r ? -1 : l > r ? 1 : 0)),
      hasSignal: init?.signal != null,
    })
    return respond(plan())
  }
  return Object.assign(handler, { preconnect: () => {} })
}

export async function underHarness<T>(
  now: number | null,
  body: (logged: Logged[]) => Promise<T>
): Promise<{ value: T | null; threw: unknown; logged: Logged[]; clockReads: number }> {
  const logged: Logged[] = []
  const realNow = Date.now
  const realError = console.error
  const realLog = console.log
  let clockReads = 0
  if (now !== null) {
    Date.now = () => {
      const read = now + clockReads
      clockReads += 1
      return read
    }
  }
  console.error = (...a: unknown[]) => {
    logged.push({ stream: "error", text: String(a[0]), err: a.length > 1 ? spellError(a[1]) : "<none>" })
  }
  console.log = (...a: unknown[]) => {
    logged.push({ stream: "log", text: String(a[0]), err: a.length > 1 ? spellError(a[1]) : "<none>" })
  }
  let value: T | null = null
  let threw: unknown = null
  try {
    value = await body(logged)
  } catch (err) {
    threw = spellError(err)
  } finally {
    Date.now = realNow
    console.error = realError
    console.log = realLog
  }
  if (Date.now !== realNow) throw new Error("the driver failed to restore Date.now")
  return { value, threw, logged, clockReads }
}
