
import { describe, expect, it } from "bun:test"
import { classifyReviveVerifyExit, type ReviveVerifySignal } from "../lib/decide-revive-verify-signal.ts"
import { decided, hold } from "../lib/digest-harness.ts"

const STANDING: Readonly<Record<string, ReviveVerifySignal>> = {
  "0": "revived",
  "1": "failed",
  "2": "failed",
  "3": "unverified",
  "4": "failed",
  "127": "failed",
  "130": "failed",
  "255": "failed",
}

describe("classifyReviveVerifyExit, held against what the code repository asserts", () => {
  it("maps every named exit code the way the standing suite asserts", () => {
    const ported: Record<string, ReviveVerifySignal> = {}
    for (const code of Object.keys(STANDING)) ported[code] = classifyReviveVerifyExit(Number(code))

    const answered = decided("ported", { value: ported, notice: null })
    expect(hold("classifyReviveVerifyExit", STANDING, answered).matches).toBe(true)
  })

  it("yields `revived` for exit 0 and for nothing else, so no other code is a false success", () => {
    const revived: number[] = []
    for (let code = -5; code <= 300; code += 1) {
      if (classifyReviveVerifyExit(code) === "revived") revived.push(code)
    }
    expect(revived).toEqual([0])
  })

  it("calls no exit code benign, that word being kept for a revive nothing concluded", () => {
    for (let code = -5; code <= 300; code += 1) {
      expect(classifyReviveVerifyExit(code)).not.toBe("benign")
    }
  })
})
