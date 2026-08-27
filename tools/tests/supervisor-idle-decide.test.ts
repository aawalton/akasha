import { describe, expect, test } from "bun:test"
import {
  type IdleObservation,
  isIdle,
  isIdleForPreservingRestart,
  isIdleForPreservingRestartPastCliff,
  isIgnoredMcpChildCmdline,
  preservingRestartBusyReason,
} from "../lib/supervisor-idle-decide.ts"

const idle: IdleObservation = {
  inFlight: 0,
  busyChildren: 0,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}

describe("isIdle", () => {
  test("all four signals quiet classifies as idle", () => {
    expect(isIdle(idle)).toBe(true)
  })

  test.each([
    ["in-flight API requests", { ...idle, inFlight: 2 }],
    ["busy non-MCP children", { ...idle, busyChildren: 1 }],
    ["live dispatch child agents", { ...idle, inFlightDispatchChildren: 3 }],
    ["unknown in-flight (proxy unreachable)", { ...idle, inFlight: null }],
    ["unknown children (/proc read failure)", { ...idle, busyChildren: null }],
    [
      "unknown dispatch children (enumeration failure)",
      { ...idle, inFlightDispatchChildren: null },
    ],
    ["claude child absent", { ...idle, claudePresent: false }],
  ] as const)("%s classifies as busy", (_label, obs) => {
    expect(isIdle(obs)).toBe(false)
  })
})

describe("isIdleForPreservingRestart", () => {
  test("three own-state signals quiet classifies as idle", () => {
    expect(isIdleForPreservingRestart(idle)).toBe(true)
  })

  test.each([
    [
      "a live RESIDENT-or-dispatch child count is ignored",
      { ...idle, inFlightDispatchChildren: 3 },
    ],
    ["an unread child count is ignored", { ...idle, inFlightDispatchChildren: null }],
  ] as const)("%s → still idle (child gate removed)", (_label, obs) => {
    expect(isIdle(obs)).toBe(false)
    expect(isIdleForPreservingRestart(obs)).toBe(true)
  })

  test.each([
    ["in-flight API requests (own mid-turn)", { ...idle, inFlight: 2 }],
    ["busy non-MCP children (own Bash/subagent)", { ...idle, busyChildren: 1 }],
    ["unknown in-flight (proxy unreachable)", { ...idle, inFlight: null }],
    ["unknown children (/proc read failure)", { ...idle, busyChildren: null }],
    ["claude child absent", { ...idle, claudePresent: false }],
  ] as const)("%s still classifies as busy (own state IS protected)", (_label, obs) => {
    expect(isIdleForPreservingRestart(obs)).toBe(false)
  })
})

describe("isIgnoredMcpChildCmdline", () => {
  test.each([
    ["stdio messages MCP server", "bun packages/agents/messages/mcp.ts"],
    ["playwright MCP via cli path", "node /home/x/.bun/install/cache/playwright-mcp/cli.js"],
    ["playwright MCP via scoped package", "node @playwright/mcp --isolated"],
    ["npm exec scoped server", "npm exec @notionhq/notion-mcp-server"],
  ])("%s is ignored", (_label, cmdline) => {
    expect(isIgnoredMcpChildCmdline(cmdline)).toBe(true)
  })

  test.each([
    ["bash snapshot shell", "/bin/bash --noprofile --norc -c sleep 5"],
    ["foreground tool command", "bun test packages/agents/supervisor/src/"],
    ["empty cmdline", ""],
  ])("%s counts busy", (_label, cmdline) => {
    expect(isIgnoredMcpChildCmdline(cmdline)).toBe(false)
  })
})

describe("preservingRestartBusyReason", () => {
  test("own-state quiet reads 'idle' (coupled to isIdleForPreservingRestart true)", () => {
    expect(preservingRestartBusyReason(idle)).toBe("idle")
    expect(isIdleForPreservingRestart(idle)).toBe(true)
  })

  test.each([
    ["a live dispatch child", { ...idle, inFlightDispatchChildren: 4 }],
    ["an unread dispatch child count", { ...idle, inFlightDispatchChildren: null }],
  ] as const)("%s is NOT named — reads 'idle' (child gate removed)", (_label, obs) => {
    expect(preservingRestartBusyReason(obs)).toBe("idle")
    expect(isIdleForPreservingRestart(obs)).toBe(true)
  })

  test.each([
    ["in-flight API requests", { ...idle, inFlight: 3 }, "inFlight=3"],
    ["busy non-MCP children", { ...idle, busyChildren: 2 }, "busyChildren=2"],
    ["claude child absent", { ...idle, claudePresent: false }, "claude-absent"],
  ] as const)("%s names the busy signal (%s)", (_label, obs, expected) => {
    expect(preservingRestartBusyReason(obs)).toBe(expected)
    expect(isIdleForPreservingRestart(obs)).toBe(false)
  })

  test("names own-state signals but omits a concurrent dispatch child", () => {
    expect(
      preservingRestartBusyReason({
        inFlight: 1,
        busyChildren: 2,
        inFlightDispatchChildren: 5,
        claudePresent: false,
      })
    ).toBe("inFlight=1, busyChildren=2, claude-absent")
  })

  test("ignoreBusyChildren omits the busyChildren term (past-cliff override)", () => {
    const busyKids = { ...idle, busyChildren: 3 }
    expect(preservingRestartBusyReason(busyKids)).toBe("busyChildren=3")
    expect(preservingRestartBusyReason(busyKids, { ignoreBusyChildren: true })).toBe("idle")
    expect(
      preservingRestartBusyReason(
        { inFlight: 1, busyChildren: 3, inFlightDispatchChildren: 0, claudePresent: true },
        { ignoreBusyChildren: true }
      )
    ).toBe("inFlight=1")
  })
})

describe("isIdleForPreservingRestartPastCliff", () => {
  test("busy non-MCP children are IGNORED — turn boundary alone classifies idle", () => {
    const busyKids = { ...idle, busyChildren: 5 }
    expect(isIdleForPreservingRestart(busyKids)).toBe(false)
    expect(isIdleForPreservingRestartPastCliff(busyKids)).toBe(true)
  })

  test("unread children are IGNORED too (null busyChildren no longer blocks)", () => {
    const unreadKids = { ...idle, busyChildren: null }
    expect(isIdleForPreservingRestart(unreadKids)).toBe(false)
    expect(isIdleForPreservingRestartPastCliff(unreadKids)).toBe(true)
  })

  test.each([
    ["in-flight API request (mid-turn — turn boundary NOT honored)", { ...idle, inFlight: 2 }],
    ["unknown in-flight (proxy unreachable — fail-safe busy)", { ...idle, inFlight: null }],
    ["claude child absent", { ...idle, claudePresent: false }],
  ] as const)("%s still classifies busy (inFlight/claude STILL gate)", (_label, obs) => {
    expect(isIdleForPreservingRestartPastCliff(obs)).toBe(false)
  })
})
