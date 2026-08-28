
import { describe, expect, it } from "bun:test"
import {
  classifyTurnEndErrorDeath,
  CONNECTION_STATUS,
  OVERLOAD_STATUS,
} from "./classify-turn-end-error-death.ts"

function assistant(status: number | null): string {
  const base = { type: "assistant", message: { role: "assistant" } }
  return JSON.stringify(
    status === null ? base : { ...base, isApiErrorMessage: true, apiErrorStatus: status }
  )
}

const overload = (): string => assistant(OVERLOAD_STATUS)
const connection = (): string => assistant(CONNECTION_STATUS)
const good = (): string => assistant(null)
const limit = (): string => assistant(429)

describe("classifyTurnEndErrorDeath", () => {
  it("empty text reads as no death", () => {
    expect(classifyTurnEndErrorDeath("")).toEqual({
      detected: false,
      consecutive: 0,
      statuses: [],
    })
  })

  it("unparseable lines are skipped rather than throwing", () => {
    expect(classifyTurnEndErrorDeath(`not json\n${overload()}`).detected).toBe(true)
  })

  it("a turn the agent ended itself is not a death", () => {
    expect(classifyTurnEndErrorDeath(good())).toEqual({
      detected: false,
      consecutive: 0,
      statuses: [],
    })
  })

  it("a usage-limit ending is not resumable here (that is the limit sibling's case)", () => {
    expect(classifyTurnEndErrorDeath(limit())).toEqual({
      detected: false,
      consecutive: 0,
      statuses: [],
    })
  })

  it("one trailing overload reads as one attempt", () => {
    expect(classifyTurnEndErrorDeath([good(), overload()].join("\n"))).toEqual({
      detected: true,
      consecutive: 1,
      statuses: [OVERLOAD_STATUS],
    })
  })

  it("one trailing connection failure reads as one attempt", () => {
    expect(classifyTurnEndErrorDeath([good(), connection()].join("\n"))).toEqual({
      detected: true,
      consecutive: 1,
      statuses: [CONNECTION_STATUS],
    })
  })

  it("counts the whole trailing run, which is what grows the wait", () => {
    const text = [good(), overload(), overload(), overload()].join("\n")
    expect(classifyTurnEndErrorDeath(text)).toEqual({
      detected: true,
      consecutive: 3,
      statuses: [OVERLOAD_STATUS, OVERLOAD_STATUS, OVERLOAD_STATUS],
    })
  })

  it("counts a run mixing both kinds, since the wait is the same either way", () => {
    const text = [good(), connection(), overload(), connection()].join("\n")
    expect(classifyTurnEndErrorDeath(text)).toEqual({
      detected: true,
      consecutive: 3,
      statuses: [CONNECTION_STATUS, OVERLOAD_STATUS, CONNECTION_STATUS],
    })
  })

  it("a good turn between deaths breaks the run, so recovery resets the wait", () => {
    const text = [overload(), overload(), good(), connection()].join("\n")
    expect(classifyTurnEndErrorDeath(text)).toEqual({
      detected: true,
      consecutive: 1,
      statuses: [CONNECTION_STATUS],
    })
  })

  it("a limit ending between deaths breaks the run too", () => {
    const text = [overload(), limit(), connection()].join("\n")
    expect(classifyTurnEndErrorDeath(text)).toEqual({
      detected: true,
      consecutive: 1,
      statuses: [CONNECTION_STATUS],
    })
  })

  it("entries after the last assistant do not hide the death", () => {
    const text = [connection(), JSON.stringify({ type: "system" })].join("\n")
    expect(classifyTurnEndErrorDeath(text).detected).toBe(true)
  })

  it("reads only the statuses it is given when they are named", () => {
    const text = [good(), connection()].join("\n")
    expect(classifyTurnEndErrorDeath(text, [OVERLOAD_STATUS])).toEqual({
      detected: false,
      consecutive: 0,
      statuses: [],
    })
  })

  it("a non-numeric status is not a death", () => {
    const text = JSON.stringify({
      type: "assistant",
      isApiErrorMessage: true,
      apiErrorStatus: "502",
    })
    expect(classifyTurnEndErrorDeath(text).detected).toBe(false)
  })
})
