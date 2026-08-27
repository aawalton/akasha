
import { describe } from "bun:test"
import {
  applyRefreshedSessionToStorageState,
  classifyPlaywrightStorageState,
  JWT_FRESHNESS_MARGIN_MS,
} from "../lib/playwright-storage-state.ts"
import { holdAgainstStanding, type Scenario } from "./supervisor-mcp-arm.ts"

const NOW_MS = 1_783_000_000_000

function fakeJwt(expMs: number): string {
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(expMs / 1000) }), "utf8").toString(
    "base64url"
  )
  return `eyJhbGciOiJSUzI1NiJ9.${payload}.fake-signature`
}

function encodeSession(session: Record<string, unknown>): string {
  return `base64-${Buffer.from(JSON.stringify(session), "utf8").toString("base64")}`
}

function makeState(opts: { expMs: number; extraCookie?: boolean }): string {
  const session = {
    access_token: fakeJwt(opts.expMs),
    token_type: "bearer",
    expires_in: 3600,
    expires_at: Math.floor(opts.expMs / 1000),
    refresh_token: "rt-original",
    user: { id: "user-1", email: "t@example.com" },
    weak_password: null,
  }
  const cookies: unknown[] = [
    {
      name: "sb-supabase-auth-token",
      value: encodeSession(session),
      domain: ".alanwalton.com",
      path: "/",
      expires: 1_817_589_713,
      httpOnly: false,
      secure: true,
      sameSite: "Lax",
    },
  ]
  if (opts.extraCookie === true) {
    cookies.push({ name: "unrelated", value: "v", domain: ".alanwalton.com", path: "/" })
  }
  return JSON.stringify({ cookies, origins: [] })
}

function kindOnly(raw: string): Record<string, unknown> {
  const c = classifyPlaywrightStorageState(raw, NOW_MS)
  return { kind: c.kind, reason: c.kind === "needs-export" ? c.reason : null }
}

const CHUNKED = (() => {
  const value = encodeSession({
    access_token: fakeJwt(NOW_MS + JWT_FRESHNESS_MARGIN_MS + 60_000),
    refresh_token: "rt-chunked",
  })
  const mid = Math.floor(value.length / 2)
  return JSON.stringify({
    cookies: [
      { name: "sb-supabase-auth-token.1", value: value.slice(mid) },
      { name: "sb-supabase-auth-token.0", value: value.slice(0, mid) },
    ],
    origins: [],
  })
})()

const SECRET_STATE = JSON.stringify({
  cookies: [{ name: "sb-supabase-auth-token", value: "base64-c2VjcmV0LXRva2Vu" }],
  origins: [],
})

const REFRESHED = {
  access_token: fakeJwt(NOW_MS + 3_600_000),
  refresh_token: "rt-next",
  expires_in: 3600,
  expires_at: Math.floor((NOW_MS + 3_600_000) / 1000),
}

describe("classifyPlaywrightStorageState", () => {
  const scenarios: readonly Scenario[] = [
    {
      name: "fresh when the JWT expires beyond the margin",
      ported: () => kindOnly(makeState({ expMs: NOW_MS + JWT_FRESHNESS_MARGIN_MS + 60_000 })),
      standing: { kind: "fresh", reason: null },
    },
    {
      name: "an expired JWT needs a refresh, and the session comes back with it",
      ported: () => {
        const c = classifyPlaywrightStorageState(makeState({ expMs: NOW_MS - 1000 }), NOW_MS)
        return {
          kind: c.kind,
          refreshToken: c.kind === "needs-refresh" ? c.session.refresh_token : null,
        }
      },
      standing: { kind: "needs-refresh", refreshToken: "rt-original" },
    },
    {
      name: "a JWT expiring inside the margin needs a refresh",
      ported: () => kindOnly(makeState({ expMs: NOW_MS + JWT_FRESHNESS_MARGIN_MS - 1000 })),
      standing: { kind: "needs-refresh", reason: null },
    },
    {
      name: "an empty stub needs an export and can never read as fresh",
      ported: () => kindOnly('{"cookies":[],"origins":[]}'),
      standing: {
        kind: "needs-export",
        reason: "no sb-*-auth-token cookie (unauthenticated stub)",
      },
    },
    {
      name: "invalid JSON needs an export",
      ported: () => kindOnly("not json"),
      standing: { kind: "needs-export", reason: "file is not valid JSON" },
    },
    {
      name: "an undecodable cookie value needs an export",
      ported: () =>
        kindOnly(
          JSON.stringify({
            cookies: [{ name: "sb-supabase-auth-token", value: "base64-!!!notb64json" }],
            origins: [],
          })
        ),
      standing: {
        kind: "needs-export",
        reason: "auth cookie value did not decode to a session",
      },
    },
    {
      name: "chunked cookie halves reassemble in index order and classify",
      ported: () => kindOnly(CHUNKED),
      standing: { kind: "fresh", reason: null },
    },
    {
      name: "a refusal reason carries no token material",
      ported: () => {
        const c = classifyPlaywrightStorageState(SECRET_STATE, NOW_MS)
        const reason = c.kind === "needs-export" ? c.reason : ""
        return {
          kind: c.kind,
          containsCiphertext: reason.includes("c2VjcmV0"),
          containsPlaintext: reason.includes("secret"),
        }
      },
      standing: { kind: "needs-export", containsCiphertext: false, containsPlaintext: false },
    },
    {
      name: "the freshness margin is ten minutes",
      ported: () => ({ marginMs: JWT_FRESHNESS_MARGIN_MS }),
      standing: { marginMs: 600_000 },
    },
  ]
  holdAgainstStanding(scenarios)
})

describe("applyRefreshedSessionToStorageState", () => {
  const scenarios: readonly Scenario[] = [
    {
      name: "splices the tokens, and the rewritten state classifies fresh",
      ported: () => {
        const r = applyRefreshedSessionToStorageState(
          makeState({ expMs: NOW_MS - 1000, extraCookie: true }),
          REFRESHED,
          NOW_MS
        )
        if (!r.ok) return { ok: false, kind: null, refreshToken: null }
        const c = classifyPlaywrightStorageState(r.contents, NOW_MS)
        return {
          ok: true,
          kind: c.kind,
          refreshToken: c.kind === "fresh" ? c.session.refresh_token : null,
        }
      },
      standing: { ok: true, kind: "fresh", refreshToken: "rt-next" },
    },
    {
      name: "preserves unrelated cookies, cookie attributes and session fields",
      ported: () => {
        const r = applyRefreshedSessionToStorageState(
          makeState({ expMs: NOW_MS - 1000, extraCookie: true }),
          REFRESHED,
          NOW_MS
        )
        if (!r.ok) throw new Error(`rewrite refused: ${r.reason}`)
        const state = JSON.parse(r.contents) as {
          cookies: { name: string; value: string; domain?: string; expires?: number }[]
        }
        const auth = state.cookies.find((c) => c.name === "sb-supabase-auth-token")
        if (auth === undefined) throw new Error("auth cookie missing from the rewritten state")
        const session = JSON.parse(
          Buffer.from(auth.value.slice("base64-".length), "base64").toString("utf8")
        ) as Record<string, unknown>
        return {
          cookieCount: state.cookies.length,
          authDomain: auth.domain ?? null,
          authExpires: auth.expires ?? null,
          user: session.user,
          tokenType: session.token_type,
          accessTokenIsRefreshed: session.access_token === REFRESHED.access_token,
        }
      },
      standing: {
        cookieCount: 2,
        authDomain: ".alanwalton.com",
        authExpires: 1_817_589_713,
        user: { id: "user-1", email: "t@example.com" },
        tokenType: "bearer",
        accessTokenIsRefreshed: true,
      },
    },
    {
      name: "refuses a chunked, multi-cookie state",
      ported: () => {
        const r = applyRefreshedSessionToStorageState(
          JSON.stringify({
            cookies: [
              { name: "sb-supabase-auth-token.0", value: "base64-x" },
              { name: "sb-supabase-auth-token.1", value: "base64-y" },
            ],
            origins: [],
          }),
          REFRESHED,
          NOW_MS
        )
        return { ok: r.ok, reason: r.ok ? null : r.reason }
      },
      standing: { ok: false, reason: "expected exactly 1 auth cookie, found 2" },
    },
    {
      name: "refuses when the rewritten cookie would cross the chunk limit",
      ported: () => {
        const r = applyRefreshedSessionToStorageState(
          makeState({ expMs: NOW_MS - 1000 }),
          { ...REFRESHED, access_token: `${fakeJwt(NOW_MS + 3_600_000)}${"x".repeat(4000)}` },
          NOW_MS
        )
        return { ok: r.ok, reason: r.ok ? null : r.reason }
      },
      standing: { ok: false, reason: "rewritten cookie would exceed the chunk limit" },
    },
  ]
  holdAgainstStanding(scenarios)
})

const GARBAGE = [
  "",
  " ",
  "null",
  "0",
  "[]",
  "{}",
  "not json",
  '{"cookies":[]}',
  '{"cookies":[],"origins":[]}',
  '{"cookies":[{"name":"x","value":"y"}]}',
  '{"cookies":[{"name":"sb-a-auth-token","value":"zz"}]}',
  " ",
  "🙂",
  '{"cookies":"no"}',
]

const OFFSETS = [
  -86_400_000, -3_600_000, -1_000, -1, 0, 1, 599_999, 600_000, 600_001, 601_000, 3_600_000,
  86_400_000,
]

function stateWith(expMs: number, refreshToken: string, filler: string): string {
  const session = { access_token: fakeJwt(expMs), refresh_token: refreshToken, user: { note: filler } }
  const value = `base64-${Buffer.from(JSON.stringify(session), "utf8").toString("base64")}`
  return JSON.stringify({
    cookies: [{ name: "sb-supabase-auth-token", value, domain: ".alanwalton.com", path: "/" }],
    origins: [],
  })
}

const FILLERS = ["", "x", "x".repeat(200), "x".repeat(500)]
const ROUNDTRIP_OFFSETS = [-86_400_000, -1_000, 0, 3_600_000]

describe("the storage-state properties, as a fixed sweep", () => {
  const scenarios: readonly Scenario[] = [
    {
      name: "classification is total on garbage, and never fresh",
      ported: () => ({
        kinds: GARBAGE.map((raw) => classifyPlaywrightStorageState(raw, NOW_MS).kind),
      }),
      standing: {
        kinds: [
          "needs-export",
          "needs-export",
          "needs-export",
          "needs-export",
          "needs-export",
          "needs-export",
          "needs-export",
          "needs-export",
          "needs-export",
          "needs-export",
          "needs-export",
          "needs-export",
          "needs-export",
          "needs-export",
        ],
      },
    },
    {
      name: "fresh exactly where the stored expiry is past now plus the margin",
      ported: () => ({
        kinds: OFFSETS.map(
          (offsetMs) =>
            classifyPlaywrightStorageState(stateWith(NOW_MS + offsetMs, "rt", "f"), NOW_MS).kind
        ),
      }),
      standing: {
        kinds: [
          "needs-refresh",
          "needs-refresh",
          "needs-refresh",
          "needs-refresh",
          "needs-refresh",
          "needs-refresh",
          "needs-refresh",
          "needs-refresh",
          "needs-refresh",
          "fresh",
          "fresh",
          "fresh",
        ],
      },
    },
    {
      name: "the rewrite either refuses or yields a state carrying exactly the refreshed tokens",
      ported: () => {
        const rows: unknown[] = []
        for (const offsetMs of ROUNDTRIP_OFFSETS) {
          for (const filler of FILLERS) {
            const raw = stateWith(NOW_MS + offsetMs, "rt-old", filler)
            const r = applyRefreshedSessionToStorageState(
              raw,
              {
                access_token: fakeJwt(NOW_MS + 3_600_000),
                refresh_token: "rt-new",
                expires_in: 3600,
              },
              NOW_MS
            )
            if (!r.ok) {
              rows.push({ offsetMs, fillerLength: filler.length, ok: false, kind: null, refreshToken: null, accessTokenCarried: null, note: null })
              continue
            }
            const c = classifyPlaywrightStorageState(r.contents, NOW_MS)
            const session = c.kind === "fresh" ? c.session : null
            rows.push({
              offsetMs,
              fillerLength: filler.length,
              ok: true,
              kind: c.kind,
              refreshToken: session?.refresh_token ?? null,
              accessTokenCarried: session?.access_token === fakeJwt(NOW_MS + 3_600_000),
              note: (session as { user?: { note?: string } } | null)?.user?.note ?? null,
            })
          }
        }
        return { rows }
      },
      standing: {
        rows: ROUNDTRIP_OFFSETS.flatMap((offsetMs) =>
          FILLERS.map((filler) => ({
            offsetMs,
            fillerLength: filler.length,
            ok: true,
            kind: "fresh",
            refreshToken: "rt-new",
            accessTokenCarried: true,
            note: filler,
          }))
        ),
      },
    },
  ]
  holdAgainstStanding(scenarios)
})
