
import { describe, expect, it } from "bun:test"
import { type DispatchChild, selectInFlightDispatch } from "../lib/supervisor-idle-observe.ts"

const PARENT = "019ee764-0000-7000-8000-00000000000p"

const OTHER_PARENT = "019ee764-0000-7000-8000-00000000000q"

const A = "019ee764-0000-7000-8000-00000000000a"

const B = "019ee764-0000-7000-8000-00000000000b"

const C = "019ee764-0000-7000-8000-00000000000c"

function child(
  agentId: string,
  principalSeatId: string | null,
  presence: DispatchChild["presence"]
): DispatchChild {
  return { agentId, principalSeatId, presence }
}

describe("a dispatched child is in flight while its own page says an agent is present in it", () => {
  it("counts a child whose page names this seat as the one its work is for", () => {
    const held = selectInFlightDispatch([child(A, PARENT, "present")], PARENT)

    expect(held.map((one) => one.agentId)).toEqual([A])
  })

  it("does not count a child whose page says no agent is present in it", () => {
    expect(selectInFlightDispatch([child(B, PARENT, "absent")], PARENT)).toEqual([])
  })

  it("counts a child whose presence cannot be read, so a parent never idles past one", () => {
    const held = selectInFlightDispatch([child(B, PARENT, "unknown")], PARENT)

    expect(held.map((one) => one.agentId)).toEqual([B])
  })

  it("does not count a present child whose work is for a different seat", () => {
    expect(selectInFlightDispatch([child(C, OTHER_PARENT, "present")], PARENT)).toEqual([])
  })

  it("does not count a child whose work is for a person rather than a seat", () => {
    expect(selectInFlightDispatch([child(C, null, "present")], PARENT)).toEqual([])
  })

  it("counts each standing child once, so a parent waits on all of them", () => {
    const held = selectInFlightDispatch(
      [
        child(A, PARENT, "present"),
        child(B, PARENT, "unknown"),
        child(C, OTHER_PARENT, "present"),
      ],
      PARENT
    )

    expect(held).toHaveLength(2)
  })
})
