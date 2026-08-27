import { describe, expect, test } from "bun:test"
import {
  decideTokenTerminalAlert,
  type TokenTerminalAlertInput,
} from "../lib/oauth-token-terminal-alert.ts"

const NOW = Date.UTC(2026, 6, 19)
const EXPIRED = NOW - 60_000
const LIVE = NOW + 60_000

function input(over: Partial<TokenTerminalAlertInput>): TokenTerminalAlertInput {
  return {
    refreshTerminal: false,
    refreshOk: false,
    accessTokenExpiresAtMs: LIVE,
    alreadyAlertedAtMs: null,
    nowMs: NOW,
    ...over,
  }
}

describe("decideTokenTerminalAlert — the #15754 unit quadrants", () => {
  test("terminal + expired access + not latched → alert (fresh transition)", () => {
    expect(
      decideTokenTerminalAlert(
        input({ refreshTerminal: true, accessTokenExpiresAtMs: EXPIRED, alreadyAlertedAtMs: null })
      )
    ).toBe("alert")
  })

  test("terminal + expired access + already latched → none (once per outage)", () => {
    expect(
      decideTokenTerminalAlert(
        input({
          refreshTerminal: true,
          accessTokenExpiresAtMs: EXPIRED,
          alreadyAlertedAtMs: NOW - 3_600_000,
        })
      )
    ).toBe("none")
  })

  test("terminal + LIVE access → none (keeps serving until expiry, never alerted)", () => {
    expect(
      decideTokenTerminalAlert(
        input({ refreshTerminal: true, accessTokenExpiresAtMs: LIVE, alreadyAlertedAtMs: null })
      )
    ).toBe("none")
  })

  test("transient (retryable) failure → none (never alerts, never latches)", () => {
    expect(
      decideTokenTerminalAlert(
        input({
          refreshTerminal: false,
          refreshOk: false,
          accessTokenExpiresAtMs: EXPIRED,
          alreadyAlertedAtMs: null,
        })
      )
    ).toBe("none")
  })

  test("re-auth (ok) while latched → clear-latch (heal)", () => {
    expect(
      decideTokenTerminalAlert(input({ refreshOk: true, alreadyAlertedAtMs: NOW - 3_600_000 }))
    ).toBe("clear-latch")
  })

  test("ok while NOT latched → none (nothing to clear)", () => {
    expect(decideTokenTerminalAlert(input({ refreshOk: true, alreadyAlertedAtMs: null }))).toBe(
      "none"
    )
  })

  test("terminal + null expiry (unknown) → none (cannot assert expired)", () => {
    expect(
      decideTokenTerminalAlert(
        input({ refreshTerminal: true, accessTokenExpiresAtMs: null, alreadyAlertedAtMs: null })
      )
    ).toBe("none")
  })

  test("terminal + expiry exactly now → alert (<= now counts as expired)", () => {
    expect(
      decideTokenTerminalAlert(
        input({ refreshTerminal: true, accessTokenExpiresAtMs: NOW, alreadyAlertedAtMs: null })
      )
    ).toBe("alert")
  })

  test("retryable while latched → none (an in-outage blip does NOT heal the latch)", () => {
    expect(
      decideTokenTerminalAlert(
        input({
          refreshTerminal: false,
          refreshOk: false,
          accessTokenExpiresAtMs: EXPIRED,
          alreadyAlertedAtMs: NOW - 3_600_000,
        })
      )
    ).toBe("none")
  })
})
