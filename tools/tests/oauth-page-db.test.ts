import { describe, expect, it } from "bun:test"
import {
  accountStateFrom,
  instantOf,
  saidOf,
} from "../lib/oauth-page-db.ts"
import type { PageAccountState } from "../lib/oauth-page-state.ts"

const HELD: PageAccountState = {
  account: "aawalton",
  fiveHourUtil: 0,
  sevenDayUtil: 8,
  sevenDayResetsAt: "2026-08-23T08:59:59.729248+00:00",
  fiveHourResetsAt: "2026-08-19T01:39:59.729223+00:00",
  subscriptionType: "max",
  subscriptionDisabled: false,
  retryAfterMs: null,
  terminalAtMs: null,
  terminalAlertedAtMs: null,
  lastWindowTriggerAtMs: null,
  accessTokenExpiresAtMs: 1787118527760,
}

describe("instantOf — one spelling for an instant, whichever source it came from", () => {
  it("answers the microsecond-and-offset spelling a page holds in the spelling a row holds", () => {
    expect(instantOf("2026-08-19T01:39:59.729223+00:00")).toBe("2026-08-19T01:39:59.729Z")
  })

  it("leaves a spelling that already stands in that form alone", () => {
    expect(instantOf("2026-08-19T01:39:59.729Z")).toBe("2026-08-19T01:39:59.729Z")
  })

  it("answers nothing for a spelling that is not an instant, rather than 1970", () => {
    expect(instantOf("whenever")).toBeNull()
    expect(instantOf(null)).toBeNull()
  })
})

describe("accountStateFrom — a page's state as the shape both sources answer in", () => {
  it("carries both reset instants in one spelling, so nothing downstream reads drift into them", () => {
    const state = accountStateFrom(HELD)
    expect(state.fiveHourResetsAt).toBe("2026-08-19T01:39:59.729Z")
    expect(state.sevenDayResetsAt).toBe("2026-08-23T08:59:59.729Z")
  })

  it("reads a terminal renewal off whether the page holds the instant at all", () => {
    expect(accountStateFrom(HELD).renewalTerminal).toBe(false)
    expect(accountStateFrom({ ...HELD, terminalAtMs: 1787118527760 }).renewalTerminal).toBe(true)
  })
})

describe("saidOf — what a page push is reported as", () => {
  it("names the account and what reached the page", () => {
    expect(
      saidOf({
        kind: "pushed",
        account: "aawalton",
        sidecar: "claude-accounts/aawalton.sops.yaml",
        digests: ["access-token abc123", "refresh-token def456"],
        sha: "deadbeef",
        unpushed: null,
      })
    ).toBe("aawalton: access-token abc123, refresh-token def456")
  })

  it("tells a page that already held the credential from one that took it", () => {
    expect(
      saidOf({
        kind: "unchanged",
        account: "aawalton",
        sidecar: "claude-accounts/aawalton.sops.yaml",
      })
    ).toBe("aawalton: page already held it")
  })

  it("carries the reason through for a refusal and for a skip alike", () => {
    expect(saidOf({ kind: "refused", account: "aine", why: "names no sops file beside it" })).toBe(
      "aine: names no sops file beside it"
    )
    expect(saidOf({ kind: "skipped", account: "ctw", why: "no page stands there" })).toBe(
      "ctw: no page stands there"
    )
  })
})
