
import { describe, expect, test } from "bun:test"
import { supervisorSocketPath, supervisorsRootDir } from "../lib/supervisor-log-path.ts"

describe("supervisorsRootDir / supervisorSocketPath", () => {
  test("the root ends in code/.claude/supervisors", () => {
    expect(supervisorsRootDir().endsWith("/code/.claude/supervisors")).toBe(true)
  })

  test("the socket path is id-keyed, and takes a base directory in place of the root", () => {
    expect(supervisorSocketPath("abc-123").endsWith("/abc-123/oauth-proxy.sock")).toBe(true)
    expect(supervisorSocketPath("abc-123", "/base/example")).toBe(
      "/base/example/abc-123/oauth-proxy.sock"
    )
  })
})
