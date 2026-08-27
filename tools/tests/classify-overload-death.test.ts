
import { describe, expect, it } from "bun:test"
import { classifyOverloadDeath, OVERLOAD_STATUS } from "../lib/classify-overload-death.ts"

function assistant(status: number | null): string {
  const base = { type: "assistant", message: { role: "assistant" } }
  return JSON.stringify(
    status === null ? base : { ...base, isApiErrorMessage: true, apiErrorStatus: status }
  )
}

const overload = (): string => assistant(OVERLOAD_STATUS)
const good = (): string => assistant(null)
const limit = (): string => assistant(429)

describe("classifyOverloadDeath", () => {
  it("empty text reads as no overload", () => {
    expect(classifyOverloadDeath("")).toEqual({ detected: false, consecutive: 0 })
  })

  it("unparseable lines are skipped rather than throwing", () => {
    expect(classifyOverloadDeath(`not json\n${overload()}`).detected).toBe(true)
  })

  it("a turn the agent ended itself is not an overload", () => {
    expect(classifyOverloadDeath(good())).toEqual({ detected: false, consecutive: 0 })
  })

  it("a usage-limit ending is not an overload (that is the limit sibling's case)", () => {
    expect(classifyOverloadDeath(limit())).toEqual({ detected: false, consecutive: 0 })
  })

  it("one trailing overload reads as one attempt", () => {
    expect(classifyOverloadDeath([good(), overload()].join("\n"))).toEqual({
      detected: true,
      consecutive: 1,
    })
  })

  it("counts the whole trailing run, which is what grows the wait", () => {
    const text = [good(), overload(), overload(), overload()].join("\n")
    expect(classifyOverloadDeath(text)).toEqual({ detected: true, consecutive: 3 })
  })

  it("a good turn between overloads breaks the run, so recovery resets the wait", () => {
    const text = [overload(), overload(), good(), overload()].join("\n")
    expect(classifyOverloadDeath(text)).toEqual({ detected: true, consecutive: 1 })
  })

  it("a limit ending between overloads breaks the run too", () => {
    const text = [overload(), limit(), overload()].join("\n")
    expect(classifyOverloadDeath(text)).toEqual({ detected: true, consecutive: 1 })
  })

  it("entries after the last assistant do not hide the overload", () => {
    const text = [overload(), JSON.stringify({ type: "system" })].join("\n")
    expect(classifyOverloadDeath(text).detected).toBe(true)
  })
})
