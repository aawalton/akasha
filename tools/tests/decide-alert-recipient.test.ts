import { describe, expect, test } from "bun:test"
import {
  ALERT_ROLE,
  type AlertRequirementRow,
  decideAlertRecipient,
} from "../lib/decide-alert-recipient.ts"

const ROWS: readonly AlertRequirementRow[] = [
  { slug: "infra-alert", domain: "infra", person: null },
  { slug: "subscriber-lag", domain: "code-harness", person: null },
  { slug: "claude-account-login-needed", domain: null, person: "alan" },
  { slug: "silent", domain: null, person: null },
  { slug: "torn", domain: "infra", person: "alan" },
]

describe("decideAlertRecipient", () => {
  test("an alert stating a domain answers that domain and names no party", () => {
    expect(decideAlertRecipient("infra-alert", ROWS)).toEqual({
      kind: "domain",
      domain: "infra",
      role: ALERT_ROLE,
    })
  })

  test("an alert stating a person answers that person", () => {
    expect(decideAlertRecipient("claude-account-login-needed", ROWS)).toEqual({
      kind: "person",
      person: "alan",
    })
  })

  test("surrounding space on the alert named does not change what it reaches", () => {
    expect(decideAlertRecipient("  subscriber-lag ", ROWS)).toEqual({
      kind: "domain",
      domain: "code-harness",
      role: ALERT_ROLE,
    })
  })

  test("an alert no document declares is unresolved and says a document is what settles it", () => {
    const decision = decideAlertRecipient("dispatch-stall", ROWS)
    expect(decision.kind).toBe("unresolved")
    if (decision.kind === "unresolved") {
      expect(decision.reason).toContain("dispatch-stall")
      expect(decision.reason).toContain("domains/alerts/")
    }
  })

  test("a document stating neither key is unresolved apart from one that is missing", () => {
    const decision = decideAlertRecipient("silent", ROWS)
    expect(decision.kind).toBe("unresolved")
    if (decision.kind === "unresolved") {
      expect(decision.reason).toContain("neither")
      expect(decision.reason).not.toContain("domains/alerts/")
    }
  })

  test("a document stating both refuses to pick one rather than preferring a key", () => {
    const decision = decideAlertRecipient("torn", ROWS)
    expect(decision.kind).toBe("unresolved")
    if (decision.kind === "unresolved") expect(decision.reason).toContain("both")
  })

  test("two documents claiming one slug refuse rather than taking the first", () => {
    const decision = decideAlertRecipient("infra-alert", [...ROWS, ...ROWS])
    expect(decision.kind).toBe("unresolved")
    if (decision.kind === "unresolved") expect(decision.reason).toContain("2 alert documents")
  })

  test("an alert of nothing but space is refused before the rows are searched", () => {
    expect(decideAlertRecipient("   ", ROWS).kind).toBe("unresolved")
  })

  test("a key present but blank reads as absent rather than as a recipient named blank", () => {
    const decision = decideAlertRecipient("blank", [{ slug: "blank", domain: "  ", person: null }])
    expect(decision.kind).toBe("unresolved")
    if (decision.kind === "unresolved") expect(decision.reason).toContain("neither")
  })
})
