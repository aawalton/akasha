
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { askReExecJitterMs, readReExecJitterMs } from "../lib/supervisor-self-heal-jitter-rule.ts"
import {
  ASKS,
  type AskScenario,
  degraded,
  portedRefusal,
  READS,
  type ReadScenario,
  type Recording,
  standingRefusal,
} from "./supervisor-self-heal-jitter-rule-vectors.ts"

type Read =
  | { readonly ok: true; readonly value: number }
  | { readonly ok: false; readonly thrown: string }

function portedRead(scenario: ReadScenario): Read {
  try {
    return { ok: true, value: readReExecJitterMs(scenario.answered) }
  } catch (error) {
    return { ok: false, thrown: String(error) }
  }
}

async function portedAsk(scenario: AskScenario): Promise<Recording> {
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
    const answer = await askReExecJitterMs(scenario.randFloat, scenario.rawMaxJitterMs, ask)
    return { sent, value: answer.value, notice: answer.notice, logged }
  } finally {
    console.error = kept
  }
}

function readSides(scenario: ReadScenario): { standing: Read; ported: Read } {
  if (scenario.refused === undefined) {
    const both: Read = { ok: true, value: scenario.held ?? 0 }
    return { standing: both, ported: both }
  }
  return {
    standing: { ok: false, thrown: standingRefusal(scenario.refused) },
    ported: { ok: false, thrown: portedRefusal(scenario.refused) },
  }
}

function askSides(scenario: AskScenario): { standing: Recording; ported: Recording } {
  const { sent } = scenario
  if (scenario.rejected !== undefined) {
    const both: Recording = { sent, value: 0, ...degraded(scenario.rejected) }
    return { standing: both, ported: both }
  }
  if (scenario.refused !== undefined) {
    return {
      standing: { sent, value: 0, ...degraded(standingRefusal(scenario.refused)) },
      ported: { sent, value: 0, ...degraded(portedRefusal(scenario.refused)) },
    }
  }
  const decided: Recording = { sent, value: scenario.held ?? 0, notice: null, logged: [] }
  return { standing: decided, ported: decided }
}

describe("the ported narrow answers what the code repository's answered", () => {
  for (const scenario of READS) {
    it(scenario.name, () => {
      const sides = readSides(scenario)
      const answered = portedRead(scenario)
      const verdict = hold(scenario.name, sides.ported, answered)
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
      const against = hold(scenario.name, sides.standing, answered)
      expect(against.matches).toBe(scenario.refused === undefined)
    })
  }
})

describe("the ported ask answers what the code repository's answered", () => {
  for (const scenario of ASKS) {
    it(scenario.name, async () => {
      const sides = askSides(scenario)
      const answered = await portedAsk(scenario)
      const verdict = hold(scenario.name, sides.ported, answered)
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
      const against = hold(scenario.name, sides.standing, answered)
      expect(against.matches).toBe(scenario.refused === undefined)
    })
  }
})

describe("what the divergences are and are not", () => {
  it("every refusal is made by both sides, at the same path, in the same words", () => {
    const refusals = [...READS, ...ASKS].flatMap((one) =>
      one.refused === undefined ? [] : [one.refused]
    )
    for (const refusal of refusals) {
      expect(standingRefusal(refusal)).toContain(refusal.message)
      expect(portedRefusal(refusal)).toContain(refusal.message)
      expect(standingRefusal(refusal)).not.toBe(portedRefusal(refusal))
    }
  })

  it("no refusal changes what was decided: a degrade hands back the same zero either way", () => {
    const degrades = ASKS.filter((one) => one.refused !== undefined || one.rejected !== undefined)
    for (const scenario of degrades) {
      const sides = askSides(scenario)
      expect(sides.standing.value).toBe(0)
      expect(sides.ported.value).toBe(0)
      expect(sides.ported.sent).toBe(sides.standing.sent)
    }
  })
})
