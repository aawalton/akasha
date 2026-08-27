
import { describe, expect, it } from "bun:test"
import { decideRemoteControl } from "../lib/decide-remote-control.ts"

describe("decideRemoteControl", () => {
  it("an interactive session is ON: a terminal is attached to drive it", () => {
    expect(decideRemoteControl({ headless: false })).toBe(true)
  })

  it("a headless spawn is OFF: nothing is attached to drive", () => {
    expect(decideRemoteControl({ headless: true })).toBe(false)
  })

  it("the seat's own start mode is the whole question, no persona declaring into it", () => {
    expect(decideRemoteControl({ headless: false })).not.toBe(
      decideRemoteControl({ headless: true })
    )
  })
})
