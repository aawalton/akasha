
import { describe, expect, it } from "bun:test"
import { decideDirectRevive } from "../lib/decide-direct-revive.ts"

const SEAT = "01a00fe0-0910-784e-b0c8-5987bdc0d2fe"

describe("decideDirectRevive — a message reaches its recipient, resuming one no agent is present in", () => {
  it("leaves a stated address alone, because reachSeat already resolved and revived it", () => {
    expect(
      decideDirectRevive({ addressWasStated: true, targetAgentId: SEAT, targetIsLive: false })
    ).toBe(null)
  })

  it("does not revive a recipient an agent is already present in", () => {
    expect(
      decideDirectRevive({ addressWasStated: false, targetAgentId: SEAT, targetIsLive: true })
    ).toBe(null)
  })

  it("revives a recipient no agent is present in, which a direct address could not reach", () => {
    expect(
      decideDirectRevive({ addressWasStated: false, targetAgentId: SEAT, targetIsLive: false })
    ).toBe(SEAT)
  })

  it("revives nothing where the recipient resolved to no seat", () => {
    expect(
      decideDirectRevive({ addressWasStated: false, targetAgentId: null, targetIsLive: false })
    ).toBe(null)
  })
})
