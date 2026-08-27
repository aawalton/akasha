
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { liveDeferredRestartRule } from "../lib/supervisor-deferred-restart-rule.ts"
import {
  ASK_SCENARIOS,
  type AskRecording,
  type AskScenario,
  PURE_SCENARIOS,
  type PureRecording,
  type PureScenario,
} from "./supervisor-deferred-restart-rule-vectors.ts"
import {
  HERE_NO_DECIDE_KEY,
  HERE_NO_RULE_KEY,
  HERE_STRAY_FIRE_REASON,
  HERE_TEXT_WINDOW,
  ZOD_NO_DECIDE_KEY,
  ZOD_NO_RULE_KEY,
  ZOD_STRAY_FIRE_REASON,
  ZOD_TEXT_WINDOW,
} from "./supervisor-deferred-restart-rule-refusals.ts"

function readHere(scenario: PureScenario): PureRecording {
  try {
    return { returned: scenario.run() }
  } catch (error) {
    return { threw: String(error) }
  }
}

async function askHere(scenario: AskScenario): Promise<AskRecording> {
  const logged: string[] = []
  const realError = console.error
  console.error = (...parts: unknown[]): void => {
    logged.push(parts.map(String).join(" "))
  }
  let sent = ""
  try {
    const answered = await scenario.run((stdin: string) => {
      sent = stdin
      return "reject" in scenario.answer
        ? Promise.reject(new Error(scenario.answer.reject))
        : Promise.resolve(scenario.answer.resolve)
    })
    return { sent, value: answered.value, notice: answered.notice, logged }
  } finally {
    console.error = realError
  }
}

function held(name: string, standing: unknown, diverges: unknown, here: unknown): void {
  const verdict = hold(name, standing, here)
  if (diverges === undefined) {
    expect(verdict.ported).toBe(verdict.standing)
    expect(verdict.matches).toBe(true)
    return
  }
  expect(verdict.matches).toBe(false)
  expect(hold(name, diverges, here).matches).toBe(true)
}

describe("the ported reads answer what the code repository's answered", () => {
  for (const scenario of PURE_SCENARIOS) {
    it(scenario.name, () => {
      held(scenario.name, scenario.standing, scenario.diverges, readHere(scenario))
    })
  }
})

describe("the ported asks answer what the code repository's answered", () => {
  for (const scenario of ASK_SCENARIOS) {
    it(scenario.name, async () => {
      held(scenario.name, scenario.standing, scenario.diverges, await askHere(scenario))
    })
  }
})

describe("the divergence is in how a refusal is printed, not in what was refused", () => {
  const issues = (refusal: string): { code: string; path: string[]; message: string }[] =>
    JSON.parse(refusal.startsWith("ShapeError: ") ? refusal.slice("ShapeError: ".length) : refusal)

  const pairs: [string, string, string][] = [
    ["no rule key at all", ZOD_NO_RULE_KEY, HERE_NO_RULE_KEY],
    ["no decide key", ZOD_NO_DECIDE_KEY, HERE_NO_DECIDE_KEY],
    ["a fire reason outside the three", ZOD_STRAY_FIRE_REASON, HERE_STRAY_FIRE_REASON],
    ["a window answered as text", ZOD_TEXT_WINDOW, HERE_TEXT_WINDOW],
  ]

  for (const [what, there, here] of pairs) {
    it(`both sides refuse ${what} at one path, under one code, with one message`, () => {
      const left = issues(there)
      const right = issues(here)
      expect(right.length).toBe(left.length)
      for (const [at, issue] of left.entries()) {
        expect(right[at]?.path).toEqual(issue.path)
        expect(right[at]?.code).toBe(issue.code)
        expect(right[at]?.message).toBe(issue.message)
      }
      expect(here).not.toBe(there)
    })
  }
})

describe("production wires all three questions and none of them is a spawn until it is called", () => {
  it("carries a function for each of the three, the record every consumer takes", () => {
    expect(Object.keys(liveDeferredRestartRule).sort()).toEqual(["constants", "decide", "windows"])
  })
})
