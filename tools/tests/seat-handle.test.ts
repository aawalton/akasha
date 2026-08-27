import { afterEach, describe, expect, it } from "bun:test"
import {
  isValidSeatName,
  planSeatResolution,
  requireSenderInput,
  resolveSeatAmong,
} from "../lib/seat-handle.ts"
import type { Seated } from "../lib/seat-roster.ts"

describe("planSeatResolution — the handle shapes every seat slot accepts", () => {
  it("reads a kebab-case name as a name rather than refusing it", () => {
    expect(planSeatResolution("aine").kind).toBe("name")
  })

  it("reads a kebab name no seat holds as a name, the shape being all this settles", () => {
    expect(planSeatResolution("no-such-sender-xyz").kind).toBe("name")
  })

  it("reads a full uuid as a uuid", () => {
    expect(planSeatResolution("01a00060-a5a5-71ea-aaa5-396dea669f64").kind).toBe("uuid")
  })

  it("reads bare hex as a prefix, which is how a seat is named by the head of its id", () => {
    expect(planSeatResolution("01a00060").kind).toBe("prefix")
  })

  it("refuses a shape no slot spells", () => {
    expect(planSeatResolution("Not_A_Name").kind).toBe("invalid")
  })
})

describe("isValidSeatName — a name against the shape a seat's spelling takes", () => {
  it("admits a name carrying a letter outside the hex alphabet, however long", () => {
    expect(isValidSeatName("agent-harness-definer")).toBe(true)
  })

  it("refuses a long all-hex name, which would read as an id prefix instead", () => {
    expect(isValidSeatName("abcdef01")).toBe(false)
  })
})

describe("requireSenderInput — the sender slot, which is not the recipient's", () => {
  const held = process.env.AGENT_ID

  afterEach(() => {
    if (held === undefined) delete process.env.AGENT_ID
    else process.env.AGENT_ID = held
  })

  it("takes the flag over the environment, the caller having named a sender", async () => {
    process.env.AGENT_ID = "from-the-environment"
    expect(await requireSenderInput("from-the-flag")).toBe("from-the-flag")
  })

  it("falls back to the environment, which is what a supervisor session sets", async () => {
    process.env.AGENT_ID = "from-the-environment"
    expect(await requireSenderInput(undefined)).toBe("from-the-environment")
  })

  it("refuses in the sender's words rather than the recipient's, naming both ways in", async () => {
    delete process.env.AGENT_ID
    let message = ""
    try {
      await requireSenderInput(undefined)
    } catch (err) {
      message = err instanceof Error ? err.message : String(err)
    }
    expect(message.toLowerCase()).toContain("sender")
    expect(message.toLowerCase()).toContain("recipient")
    expect(message).toContain("--from")
    expect(message).toContain("AGENT_ID")
  })
})

describe("resolveSeatAmong — the seat a name reaches once several have carried it", () => {
  const carried = (id: string, name: string, activeAtMs: number): Seated => ({
    id,
    name,
    domain: null,
    role: null,
    activeAtMs,
    session: null,
  })

  const older = carried("019ff7d3-64eb-7461-915f-86e3404857d6", "nimue", 1_000)
  const newer = carried("01a03ba3-9352-7000-98f5-3f8c183c5e6c", "nimue", 2_000)

  it("reaches the seat that carried the name most recently", () => {
    expect(resolveSeatAmong("nimue", [], [older, newer])).toEqual({ id: newer.id })
  })

  it("reaches that same seat whichever order the roster holds them in", () => {
    expect(resolveSeatAmong("nimue", [], [newer, older])).toEqual({ id: newer.id })
  })

  it("reaches the standing seat rather than the roster, one seat standing under the name", () => {
    expect(resolveSeatAmong("nimue", [older], [older, newer])).toEqual({ id: older.id })
  })

  it("refuses a uuid prefix two seats answer to, recency settling nothing there", () => {
    const one = carried("01a03ba3-9352-7000-98f5-3f8c183c5e6c", "alpha", 1_000)
    const two = carried("01a03bee-63fd-7000-bb71-9def6ce996bb", "beta", 2_000)
    const found = resolveSeatAmong("01a03b", [], [one, two])
    expect(found).toEqual({
      error: "Ambiguous seat handle '01a03b' — 2 match: alpha, beta",
    })
  })
})
