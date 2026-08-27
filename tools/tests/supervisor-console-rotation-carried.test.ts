import { describe, expect, it } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  buildAgentLogRedirect,
  fileSink,
  LOG_MAX_BYTES,
  shouldRotate,
} from "../lib/supervisor-console.ts"

describe("shouldRotate", () => {
  it("does not rotate below the cap", () => {
    expect(shouldRotate(0, 100)).toBe(false)
    expect(shouldRotate(99, 100)).toBe(false)
  })

  it("rotates at or above the cap so the incoming line lands post-rotate", () => {
    expect(shouldRotate(100, 100)).toBe(true)
    expect(shouldRotate(101, 100)).toBe(true)
  })

  it("disables rotation for a non-positive cap", () => {
    expect(shouldRotate(1_000_000, 0)).toBe(false)
    expect(shouldRotate(1_000_000, -1)).toBe(false)
  })
})

describe("fileSink rotation", () => {
  it("renames the active file to <path>.1 and resumes in a fresh file once the cap is crossed", () => {
    const dir = mkdtempSync(join("/var/tmp", "console-redirect-"))
    const logPath = join(dir, "oauth-proxy.log")
    writeFileSync(logPath, "x".repeat(50))
    try {
      fileSink(logPath, { maxBytes: 10 })("LOG", "second")
      const backup = readFileSync(`${logPath}.1`, "utf8")
      const active = readFileSync(logPath, "utf8")
      expect(backup).toBe("x".repeat(50))
      expect(active).toContain("[LOG] second")
      expect(active).not.toContain("x".repeat(50))
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it("never rotates when rotation is not armed", () => {
    const dir = mkdtempSync(join("/var/tmp", "console-redirect-"))
    const logPath = join(dir, "unarmed.log")
    writeFileSync(logPath, "x".repeat(50))
    try {
      fileSink(logPath)("LOG", "appended")
      expect(existsSync(`${logPath}.1`)).toBe(false)
      const active = readFileSync(logPath, "utf8")
      expect(active).toContain("x".repeat(50))
      expect(active).toContain("[LOG] appended")
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe("buildAgentLogRedirect", () => {
  it("arms rotation on a seat's log, which an agent outliving the cap would otherwise grow past it", () => {
    const dir = mkdtempSync(join("/var/tmp", "agent-log-redirect-"))
    const agentId = "019fae20-f9f8-7b61-b472-6e80f4b805f2"
    const logPath = join(dir, agentId, "supervisor.log")
    const restore = buildAgentLogRedirect(dir).redirectTo(agentId)
    try {
      console.log("x".repeat(LOG_MAX_BYTES))
      console.log("past the cap")
      expect(existsSync(`${logPath}.1`)).toBe(true)
      expect(statSync(logPath).size).toBeLessThan(LOG_MAX_BYTES)
    } finally {
      restore()
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
