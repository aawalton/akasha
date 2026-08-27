import { describe, expect, it } from "bun:test"
import {
  type HealthMarkDeps,
  writeRefreshHealth,
  writeTerminalHealth,
  writeTokenTerminalAlertLatch,
  writeWindowTriggerHealth,
} from "../lib/oauth-account-health.ts"
import type { PageMark } from "../lib/oauth-page-mark.ts"
import {
  TERMINAL_ALERTED_AT_KEY,
  TERMINAL_AT_KEY,
  WINDOW_TRIGGER_AT_KEY,
} from "../lib/oauth-page-state.ts"

type PageCall = { account: string; marks: Record<string, string | null> }

function arm(
  answer: (account: string) => PageMark = (account) => ({ kind: "held", account, keys: [] })
): { deps: HealthMarkDeps; pages: PageCall[] } {
  const pages: PageCall[] = []
  const deps: HealthMarkDeps = {
    holdMark: (account, marks) => {
      pages.push({ account, marks })
      return answer(account)
    },
  }
  return { deps, pages }
}

const instantOf = (call: PageCall | undefined, key: string): number => {
  const held = call?.marks[key]
  if (typeof held !== "string") throw new Error(`expected a string under ${key}, got ${typeof held}`)
  const ms = Date.parse(held)
  if (Number.isNaN(ms)) throw new Error(`${key} held "${held}", which is not an instant`)
  return ms
}

describe("writeTokenTerminalAlertLatch — the latch on the page", () => {
  it("holds the instant it was given, so a reader sees the alert already filed", async () => {
    const { deps, pages } = arm()
    await writeTokenTerminalAlertLatch(
      { account: "aine", alertedAt: "2026-08-18T22:00:00.000Z", logPrefix: "[t]" },
      deps
    )
    expect(pages[0]?.account).toBe("aine")
    expect(pages[0]?.marks).toEqual({ [TERMINAL_ALERTED_AT_KEY]: "2026-08-18T22:00:00.000Z" })
  })

  it("clears the page key where the latch is being let go", async () => {
    const { deps, pages } = arm()
    await writeTokenTerminalAlertLatch({ account: "aine", alertedAt: null, logPrefix: "[t]" }, deps)
    expect(pages[0]?.marks).toEqual({ [TERMINAL_ALERTED_AT_KEY]: null })
  })

  it("never throws where the page refused the mark", async () => {
    const { deps, pages } = arm((account) => ({
      kind: "refused",
      account,
      why: "the page's frontmatter block is never closed",
    }))
    await expect(
      writeTokenTerminalAlertLatch({ account: "aine", alertedAt: null, logPrefix: "[t]" }, deps)
    ).resolves.toBeUndefined()
    expect(pages).toHaveLength(1)
  })

  it("never throws where the page writer threw", async () => {
    const { deps } = arm(() => {
      throw new Error("page unreachable")
    })
    await expect(
      writeTokenTerminalAlertLatch({ account: "aine", alertedAt: null, logPrefix: "[t]" }, deps)
    ).resolves.toBeUndefined()
  })
})

describe("writeWindowTriggerHealth — the trigger instant on the page", () => {
  it("holds the instant the trigger happened, and nothing else", async () => {
    const before = Date.now()
    const { deps, pages } = arm()
    await writeWindowTriggerHealth({ account: "aow", logPrefix: "[t]" }, deps)
    const after = Date.now()
    expect(Object.keys(pages[0]?.marks ?? {})).toEqual([WINDOW_TRIGGER_AT_KEY])
    const at = instantOf(pages[0], WINDOW_TRIGGER_AT_KEY)
    expect(at).toBeGreaterThanOrEqual(before)
    expect(at).toBeLessThanOrEqual(after)
  })

  it("never throws where the page writer threw", async () => {
    const { deps } = arm(() => {
      throw new Error("page unreachable")
    })
    await expect(
      writeWindowTriggerHealth({ account: "aow", logPrefix: "[t]" }, deps)
    ).resolves.toBeUndefined()
  })
})

describe("writeRefreshHealth — the terminal verdict, as the page carries it", () => {
  it("marks the page where the renewal died, which is what a reader takes as needing a login", async () => {
    const before = Date.now()
    const { deps, pages } = arm()
    await writeRefreshHealth(
      {
        account: "ctw",
        outcome: { ok: false, terminal: true, reason: "http-error", code: "invalid_grant" },
        logPrefix: "[t]",
      },
      deps
    )
    const after = Date.now()
    expect(Object.keys(pages[0]?.marks ?? {})).toEqual([TERMINAL_AT_KEY])
    const at = instantOf(pages[0], TERMINAL_AT_KEY)
    expect(at).toBeGreaterThanOrEqual(before)
    expect(at).toBeLessThanOrEqual(after)
  })

  it("takes the mark off again where the renewal worked", async () => {
    const { deps, pages } = arm()
    await writeRefreshHealth(
      {
        account: "ctw",
        outcome: {
          ok: true,
          credential: {
            account: "ctw",
            accessToken: "a",
            refreshToken: "r",
            expiresAt: 1,
            scopes: [],
            subscriptionType: null,
            rateLimitTier: null,
          },
        },
        logPrefix: "[t]",
      },
      deps
    )
    expect(pages[0]?.marks).toEqual({ [TERMINAL_AT_KEY]: null })
  })

  it("takes the mark off for a renewal that merely failed, which is not a dead login", async () => {
    const { deps, pages } = arm()
    await writeRefreshHealth(
      {
        account: "ctw",
        outcome: { ok: false, terminal: false, reason: "http-error", status: 500 },
        logPrefix: "[t]",
      },
      deps
    )
    expect(pages[0]?.marks).toEqual({ [TERMINAL_AT_KEY]: null })
  })

  it("never throws where the page refused the mark", async () => {
    const { deps, pages } = arm((account) => ({ kind: "refused", account, why: "names no page" }))
    await expect(
      writeRefreshHealth(
        {
          account: "ctw",
          outcome: { ok: false, terminal: true, reason: "http-error", code: "invalid_grant" },
          logPrefix: "[t]",
        },
        deps
      )
    ).resolves.toBeUndefined()
    expect(pages).toHaveLength(1)
  })
})

describe("writeTerminalHealth — a terminal error seen outside a renewal", () => {
  it("marks the page at the instant it was seen, and holds nothing else", async () => {
    const before = Date.now()
    const { deps, pages } = arm()
    await writeTerminalHealth({ account: "ctw", logPrefix: "[t]" }, deps)
    const after = Date.now()
    expect(pages[0]?.account).toBe("ctw")
    expect(Object.keys(pages[0]?.marks ?? {})).toEqual([TERMINAL_AT_KEY])
    const at = instantOf(pages[0], TERMINAL_AT_KEY)
    expect(at).toBeGreaterThanOrEqual(before)
    expect(at).toBeLessThanOrEqual(after)
  })

  it("never throws where the page writer threw", async () => {
    const { deps } = arm(() => {
      throw new Error("page unreachable")
    })
    await expect(writeTerminalHealth({ account: "ctw" }, deps)).resolves.toBeUndefined()
  })
})
