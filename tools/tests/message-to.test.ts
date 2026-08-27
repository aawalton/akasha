
import { describe, expect, test } from "bun:test"
import { type SeatRow, decideRecipient, readStated } from "../lib/message-to.ts"

const seat = (
  name: string,
  domain: string | null,
  role: string | null,
  activeAtMs: number
): SeatRow => ({
  id: `id-${name}`,
  name,
  domain,
  role,
  activeAtMs,
})

const FLEET: readonly SeatRow[] = [
  seat("athena", "agent-harness", "definer", 100),
  seat("dalla", "code-harness", "definer", 100),
  seat("dalla-alert-developer", "alert", "developer", 300),
  seat("sophia-alert-manager", "alert", "manager", 200),
  seat("second-manager", "alert", "manager", 400),
]

describe("readStated", () => {
  test("stating neither is an address this command was not asked to resolve", () => {
    expect(readStated(undefined, undefined)).toEqual({ kind: "none" })
  })

  test("a domain without a role is refused rather than resolved to the persona", () => {
    const stated = readStated("code-harness", undefined)
    expect(stated.kind).toBe("refuse")
    if (stated.kind === "refuse") expect(stated.reason).toContain("code-harness")
  })

  test("a role alone is refused, being held across every domain", () => {
    const stated = readStated(undefined, "operator")
    expect(stated.kind).toBe("refuse")
    if (stated.kind === "refuse") expect(stated.reason).toContain("operator")
  })

  test("the pair comes back trimmed, so a padded flag names what an unpadded one does", () => {
    expect(readStated(" alert ", " manager ")).toEqual({
      kind: "domain",
      domain: "alert",
      role: "manager",
    })
  })
})

describe("decideRecipient", () => {
  test("a domain names a seat standing on it", () => {
    const chosen = decideRecipient(readStated("agent-harness", "definer"), FLEET)
    expect(chosen.kind).toBe("seat")
    if (chosen.kind === "seat") expect(chosen.seat.name).toBe("athena")
  })

  test("a seat on a domain beneath the one named does not answer for it", () => {
    expect(decideRecipient(readStated("message", "definer"), FLEET)).toEqual({ kind: "none" })
  })

  test("where more than one matches, the most recently active one is the recipient", () => {
    const chosen = decideRecipient(readStated("alert", "manager"), FLEET)
    expect(chosen.kind).toBe("seat")
    if (chosen.kind === "seat") expect(chosen.seat.name).toBe("second-manager")
  })

  test("nothing matching is answered as none rather than as a seat nobody named", () => {
    expect(decideRecipient(readStated("code-harness", "operator"), FLEET)).toEqual({ kind: "none" })
  })
})
