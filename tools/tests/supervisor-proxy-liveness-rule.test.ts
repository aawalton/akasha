
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import {
  askProxyLiveness,
  readProxyLiveness,
} from "../lib/supervisor-proxy-liveness-rule.ts"
import { type Scenario, SCENARIOS } from "./supervisor-proxy-liveness-rule-vectors.ts"

async function ported(scenario: Scenario): Promise<unknown> {
  if (scenario.kind === "read") {
    try {
      return { value: readProxyLiveness(scenario.payload), threw: null }
    } catch (error) {
      return { value: null, threw: String(error) }
    }
  }
  let sent = ""
  const ask = (stdin: string): Promise<unknown> => {
    sent = stdin
    return "reject" in scenario.answer
      ? Promise.reject(scenario.answer.reject)
      : Promise.resolve(scenario.answer.resolve)
  }
  const logged: string[] = []
  const kept = console.error
  console.error = (...args: unknown[]): undefined => {
    logged.push(args.map((one) => String(one)).join(" "))
  }
  try {
    const answer = await askProxyLiveness(scenario.state, scenario.healthy, ask)
    return { sent, value: answer.value, notice: answer.notice, logged }
  } finally {
    console.error = kept
  }
}

describe("the ported proxy-liveness facade answers what the code repository's answered", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const answered = await ported(scenario)
      const verdict = hold(scenario.name, scenario.standing, answered)
      if (scenario.diverges === undefined) {
        expect(verdict.ported).toBe(verdict.standing)
        expect(verdict.matches).toBe(true)
        return
      }
      expect(verdict.matches).toBe(false)
      expect(hold(scenario.name, scenario.diverges.ported, answered).matches).toBe(true)
    })
  }
})

function issuesIn(text: string): readonly { path: unknown[]; message: string }[] {
  const opened = text.indexOf("[")
  if (opened === -1) throw new Error(`no refusal in \`${text}\``)
  return JSON.parse(text.slice(opened)) as { path: unknown[]; message: string }[]
}

const refusalIn = (recording: unknown): string => {
  const held = recording as { threw?: string | null; notice?: string | null }
  const text = held.threw ?? held.notice
  if (typeof text !== "string") throw new Error("a divergent vector carried no refusal at all")
  return text
}

describe("every divergence is in how a refusal is worded, not in what was decided", () => {
  const divergent = SCENARIOS.filter((one: Scenario) => one.diverges !== undefined)

  for (const scenario of divergent) {
    it(scenario.name, async () => {
      if (scenario.diverges === undefined) throw new Error("unreachable, and the filter says so")
      const here = (await ported(scenario)) as { value: unknown }
      const standing = scenario.standing as { value: unknown }

      expect(hold(scenario.name, standing.value, here.value).matches).toBe(true)

      const theirs = issuesIn(refusalIn(scenario.standing))
      const ours = issuesIn(refusalIn(here))
      expect(ours.length).toBe(theirs.length)
      for (const [at, issue] of ours.entries()) {
        expect(issue.path).toEqual(theirs[at]?.path as unknown[])
        expect(issue.message).toBe(theirs[at]?.message ?? "")
      }
      expect(refusalIn(here)).not.toBe(refusalIn(scenario.standing))
    })
  }
})
