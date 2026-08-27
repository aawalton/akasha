import { describe, expect, it } from "bun:test"
import {
  countPacedMoves,
  expectedRemainderAfterMove,
  isPacedMoveConfirmed,
  type PacedBankStep,
} from "./rules-dispatch-bank-paced-confirm"

describe("expectedRemainderAfterMove", () => {
  it("full-stack move empties the source (remainder 0)", () => {
    expect(expectedRemainderAfterMove(5, 5)).toBe(0)
  })

  it("partial move leaves the difference (stock deposit keeps target on-hand)", () => {
    expect(expectedRemainderAfterMove(10, 3)).toBe(7)
  })

  it("floors at 0 when count exceeds the live stack (engine moves min(count, avail))", () => {
    expect(expectedRemainderAfterMove(1, 2)).toBe(0)
  })

  it("a one-item stack fully moves", () => {
    expect(expectedRemainderAfterMove(1, 1)).toBe(0)
  })
})

describe("isPacedMoveConfirmed", () => {
  it("confirms when the source has dropped exactly to the expected remainder", () => {
    expect(isPacedMoveConfirmed(7, 7)).toBe(true)
  })

  it("confirms when the source dropped below the expected remainder (over-move)", () => {
    expect(isPacedMoveConfirmed(0, 0)).toBe(true)
  })

  it("does NOT confirm while the source still holds more than the remainder", () => {
    expect(isPacedMoveConfirmed(10, 7)).toBe(false)
  })

  it("confirms a full-stack withdraw once the source slot empties", () => {
    expect(isPacedMoveConfirmed(0, 0)).toBe(true)
  })

  it("stays unconfirmed at the pre-move stack level", () => {
    expect(isPacedMoveConfirmed(5, 0)).toBe(false)
  })
})

describe("countPacedMoves", () => {
  const move = (sourceSlot: number): PacedBankStep => ({
    kind: "move",
    sourceBag: 0,
    sourceSlot,
    targetBag: 1,
    targetSlot: sourceSlot,
    count: 1,
  })
  const effect: PacedBankStep = { kind: "effect", run: (): undefined => undefined }

  it("counts only move steps, ignoring the currency effect at the head", () => {
    expect(countPacedMoves([effect, move(0), move(1), move(2)])).toBe(3)
  })

  it("is 0 for a currency-only plan (no item moves)", () => {
    expect(countPacedMoves([effect])).toBe(0)
  })

  it("is 0 for an empty plan", () => {
    expect(countPacedMoves([])).toBe(0)
  })
})
