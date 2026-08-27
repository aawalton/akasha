
import { describe, expect, test } from "bun:test"
import { refuseParentless } from "../lib/refuse-parentless.ts"

const PARENT = "019fcc5d-c5ec-7e5f-ad43-85b29a81a0e3"

const FLEET = true

const PERSON = false

describe("a seat working for the fleet names the agent it works for", () => {
  test("no parent at all is refused", () => {
    expect(refuseParentless(null, FLEET)).not.toBeNull()
  })

  test("an empty parent is refused too, being no agent rather than a short one", () => {
    expect(refuseParentless("", FLEET)).not.toBeNull()
  })

  test("a parent stands, and nothing is said about who it is", () => {
    expect(refuseParentless(PARENT, FLEET)).toBeNull()
  })

  test("the refusal says what to state rather than only what is wrong", () => {
    expect(refuseParentless(null, FLEET)).toContain("AGENT_ID")
  })
})

describe("a seat answering to a person needs nobody above it", () => {
  test("no parent is fine, that person having opened it", () => {
    expect(refuseParentless(null, PERSON)).toBeNull()
  })

  test("a parent is fine too, this rule ruling on absence alone", () => {
    expect(refuseParentless(PARENT, PERSON)).toBeNull()
  })
})
