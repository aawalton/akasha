import { describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  aliasIndexesFromPages,
  lastWindowTriggerAcross,
  type PageAccountState,
  stateFromPageText,
} from "../lib/oauth-page-state.ts"

const PAGE = [
  "---",
  "page-type-slug: claude-account",
  'title: "Aawalton"',
  "subscription-type: max",
  "---",
  "",
].join("\n")

const HELD = {
  "five-hour-percent-used": 12,
  "seven-day-percent-used": 40,
  "five-hour-resets-at": "2026-08-19T01:39:59.748Z",
  "seven-day-resets-at": "2026-08-23T08:59:59.748Z",
  "access-token-expires-at": "2026-08-19T03:39:38.143Z",
}

function pageWith(lines: readonly string[]): string {
  return [
    "---",
    "page-type-slug: claude-account",
    'title: "Aawalton"',
    "subscription-type: max",
    ...lines,
    "---",
    "",
  ].join("\n")
}

describe("stateFromPageText — what the page holds today", () => {
  it("reads the usage numbers and the expiry off the uncommitted values", () => {
    const state = stateFromPageText("aawalton", PAGE, HELD)
    expect(state.account).toBe("aawalton")
    expect(state.fiveHourUtil).toBe(12)
    expect(state.sevenDayUtil).toBe(40)
    expect(state.fiveHourResetsAt).toBe("2026-08-19T01:39:59.748Z")
    expect(state.sevenDayResetsAt).toBe("2026-08-23T08:59:59.748Z")
    expect(state.accessTokenExpiresAtMs).toBe(Date.parse("2026-08-19T03:39:38.143Z"))
    expect(state.subscriptionType).toBe("max")
  })

  it("reads an account with no marks on it as one nothing is wrong with", () => {
    const state = stateFromPageText("aawalton", PAGE, HELD)
    expect(state.subscriptionDisabled).toBe(false)
    expect(state.retryAfterMs).toBeNull()
    expect(state.terminalAtMs).toBeNull()
    expect(state.terminalAlertedAtMs).toBeNull()
    expect(state.lastWindowTriggerAtMs).toBeNull()
  })
})

describe("stateFromPageText — the marks a page carries", () => {
  it("reads a withdrawn account off the reason alone", () => {
    const state = stateFromPageText(
      "aawalton",
      pageWith(["subscription-disabled-reason: subscription_expired"]),
      HELD
    )
    expect(state.subscriptionDisabled).toBe(true)
  })

  it("reads the at-limit mark, the terminal mark and the alert latch as instants", () => {
    const state = stateFromPageText(
      "aawalton",
      pageWith([
        "retry-after: 2026-08-18T22:00:00.000Z",
        "terminal-at: 2026-08-17T09:00:00.000Z",
        "terminal-alerted-at: 2026-08-17T09:05:00.000Z",
        "last-window-trigger-at: 2026-08-18T20:00:00.000Z",
      ]),
      HELD
    )
    expect(state.retryAfterMs).toBe(Date.parse("2026-08-18T22:00:00.000Z"))
    expect(state.terminalAtMs).toBe(Date.parse("2026-08-17T09:00:00.000Z"))
    expect(state.terminalAlertedAtMs).toBe(Date.parse("2026-08-17T09:05:00.000Z"))
    expect(state.lastWindowTriggerAtMs).toBe(Date.parse("2026-08-18T20:00:00.000Z"))
  })
})

describe("stateFromPageText — a page that cannot be trusted", () => {
  it("reads a missing uncommitted file as nothing used and nothing known", () => {
    const state = stateFromPageText("aawalton", PAGE, null)
    expect(state.fiveHourUtil).toBe(0)
    expect(state.sevenDayUtil).toBe(0)
    expect(state.fiveHourResetsAt).toBeNull()
    expect(state.accessTokenExpiresAtMs).toBeNull()
  })

  it("refuses a percentage that is not a number rather than coercing one", () => {
    const state = stateFromPageText("aawalton", PAGE, {
      ...HELD,
      "five-hour-percent-used": "40",
      "seven-day-percent-used": null,
    })
    expect(state.fiveHourUtil).toBe(0)
    expect(state.sevenDayUtil).toBe(0)
  })

  it("refuses an instant that does not parse rather than reading it as 1970", () => {
    const state = stateFromPageText("aawalton", pageWith(["retry-after: soon"]), {
      ...HELD,
      "access-token-expires-at": "whenever",
      "five-hour-resets-at": "",
    })
    expect(state.retryAfterMs).toBeNull()
    expect(state.accessTokenExpiresAtMs).toBeNull()
    expect(state.fiveHourResetsAt).toBeNull()
  })
})

describe("lastWindowTriggerAcross", () => {
  const at = (account: string, ms: number | null): PageAccountState => ({
    account,
    fiveHourUtil: 0,
    sevenDayUtil: 0,
    sevenDayResetsAt: null,
    fiveHourResetsAt: null,
    subscriptionType: null,
    subscriptionDisabled: false,
    retryAfterMs: null,
    terminalAtMs: null,
    terminalAlertedAtMs: null,
    lastWindowTriggerAtMs: ms,
    accessTokenExpiresAtMs: null,
  })

  it("takes the latest of them", () => {
    expect(lastWindowTriggerAcross([at("a", 100), at("b", 300), at("c", 200)])).toBe(300)
  })

  it("passes over the accounts nothing has reached", () => {
    expect(lastWindowTriggerAcross([at("a", null), at("b", 300)])).toBe(300)
  })

  it("answers nothing where nothing has been reached", () => {
    expect(lastWindowTriggerAcross([at("a", null), at("b", null)])).toBeNull()
    expect(lastWindowTriggerAcross([])).toBeNull()
  })
})

describe("aliasIndexesFromPages", () => {
  function rootWith(pages: Readonly<Record<string, string>>): string {
    const root = mkdtempSync(join("/var/tmp", "alias-index-from-pages-"))
    mkdirSync(join(root, "pages", "claude-account"), { recursive: true })
    for (const [account, stated] of Object.entries(pages)) {
      writeFileSync(
        join(root, "pages", "claude-account", `${account}.claude-account.md`),
        ["---", "page-type-slug: claude-account", stated, "---", ""].join("\n")
      )
    }
    return root
  }

  it("reads the alias index each account page states", () => {
    const root = rootWith({ aawalton: "alias-index: 1", aine: "alias-index: 8" })
    try {
      expect([...aliasIndexesFromPages(root)]).toEqual([
        ["aawalton", 1],
        ["aine", 8],
      ])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it("passes over a page stating no alias index, and one stating what is not a number", () => {
    const root = rootWith({
      aawalton: "alias-index: 1",
      aine: 'title: "Aine"',
      ctw: "alias-index: five",
    })
    try {
      expect([...aliasIndexesFromPages(root)]).toEqual([["aawalton", 1]])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it("answers nothing off a root holding no account pages", () => {
    const root = mkdtempSync(join("/var/tmp", "alias-index-empty-"))
    try {
      expect([...aliasIndexesFromPages(root)]).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
