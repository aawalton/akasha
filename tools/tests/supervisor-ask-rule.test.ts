
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { askRule } from "../lib/supervisor-ask-rule.ts"
import { type Recording, type Scenario, SCENARIOS } from "./supervisor-ask-rule-vectors.ts"

async function ported(scenario: Scenario): Promise<Recording> {
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
    const answer = await askRule(scenario.rule, scenario.question, scenario.read, scenario.safe, ask)
    return { sent, value: answer.value, notice: answer.notice, logged }
  } finally {
    console.error = kept
  }
}

describe("the ported askRule answers what the code repository's answered", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const answered = await ported(scenario)
      const verdict = hold(scenario.name, scenario.standing, answered)
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
    })
  }
})
