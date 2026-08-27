import { describe, expect, test } from "bun:test"
import { refuseStatedParent } from "../lib/refuse-stated-parent.ts"

const ORDINARY = ["--name", "writer-bot", "--prompt", "/idle"] as const

const UUID = "11111111-1111-4111-8111-111111111111"

describe("a parent cannot be stated, only inherited", () => {
  test("a call stating none passes", () => {
    expect(refuseStatedParent(ORDINARY)).toBeNull()
  })

  test("a separate value is refused", () => {
    expect(refuseStatedParent([...ORDINARY, "--agent-id", UUID])).not.toBeNull()
  })

  test("an attached value is refused too, being the same statement spelled another way", () => {
    expect(refuseStatedParent([...ORDINARY, `--agent-id=${UUID}`])).not.toBeNull()
  })

  test("the refusal names the flag the reader typed", () => {
    expect(refuseStatedParent([...ORDINARY, "--agent-id", UUID])).toContain("--agent-id")
  })

  test("the refusal says where the parent comes from instead", () => {
    expect(refuseStatedParent([...ORDINARY, "--agent-id", UUID])).toContain("AGENT_ID")
  })

  test("a flag merely starting the same way is not a statement of one", () => {
    expect(refuseStatedParent([...ORDINARY, "--agent-idle"])).toBeNull()
  })
})
