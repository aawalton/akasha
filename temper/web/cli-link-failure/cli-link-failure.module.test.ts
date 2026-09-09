import { describe, expect, it } from "bun:test"
import { type CliLinkFailure, describeCliLinkFailure } from "./cli-link-failure.module.code.ts"

describe("describeCliLinkFailure", () => {
  it("blames the connection only when no response arrived", () => {
    const unreachable = describeCliLinkFailure({ kind: "unreachable" })
    expect(unreachable).toContain("network connection")
    expect(unreachable).toContain("Try again")

    const unreadable = describeCliLinkFailure({ kind: "unreadable-response", status: 502 })
    expect(unreadable).not.toContain("network connection")
    expect(unreadable).toContain("502")
    expect(unreadable).toContain("retrying is unlikely to fix")
  })

  it("keeps the server's own reason when it gave one", () => {
    expect(
      describeCliLinkFailure({ kind: "rejected", serverError: "Not authenticated" })
    ).toContain("Not authenticated")
  })

  it("reports the status when the server answered without a session or a reason", () => {
    const described = describeCliLinkFailure({ kind: "no-session", status: 200 })
    expect(described).toContain("200")
    expect(described).toContain("not your setup")
  })

  it("names no cause it cannot observe", () => {
    const failures: CliLinkFailure[] = [
      { kind: "unreachable" },
      { kind: "unreadable-response", status: 500 },
      { kind: "rejected", serverError: "state must be a non-empty string" },
      { kind: "no-session", status: 503 },
    ]
    for (const failure of failures) {
      const described = describeCliLinkFailure(failure)
      expect(described.length).toBeGreaterThan(0)
      if (failure.kind !== "unreachable") expect(described).not.toContain("your connection")
    }
  })
})
