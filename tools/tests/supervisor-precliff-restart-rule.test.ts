
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { ShapeError } from "../lib/shape-core"
import { askPreCliffRestart, readPreCliffRestart } from "../lib/supervisor-precliff-restart-rule.ts"
import {
  ASK_SCENARIOS,
  type AskRecording,
  type AskScenario,
  READ_SCENARIOS,
  type ReadRecording,
  type ReadScenario,
} from "./supervisor-precliff-restart-rule-vectors.ts"

function portedRead(scenario: ReadScenario): ReadRecording {
  try {
    return { verdict: readPreCliffRestart(scenario.answered), issue: null }
  } catch (error) {
    if (!(error instanceof ShapeError)) return { verdict: null, issue: null }
    const first = error.issues[0]
    return {
      verdict: null,
      issue:
        first === undefined ? null : { code: first.code, path: first.path, message: first.message },
    }
  }
}

async function portedAsk(scenario: AskScenario): Promise<AskRecording> {
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
    const answer = await askPreCliffRestart(scenario.obs, scenario.thresholdMs, ask)
    return { sent, value: answer.value, notice: answer.notice, logged }
  } finally {
    console.error = kept
  }
}

const PREFIX = "supervisor-decide could not decide `preCliffRestartRule`: "
const TAIL = " — acting on the safe answer instead"
const CUT = "<the validator's own words, which differ and are pinned separately>"

function reasonless(recording: AskRecording): AskRecording {
  if (recording.notice === null) return recording
  return {
    sent: recording.sent,
    value: recording.value,
    notice: recording.notice.startsWith(PREFIX) ? `${PREFIX}${CUT}` : recording.notice,
    logged: recording.logged.map((line) =>
      line.startsWith(`[local] ${PREFIX}`) && line.endsWith(TAIL)
        ? `[local] ${PREFIX}${CUT}${TAIL}`
        : line
    ),
  }
}

describe("the ported readPreCliffRestart answers what the code repository's answered", () => {
  for (const scenario of READ_SCENARIOS) {
    it(scenario.name, () => {
      const verdict = hold(scenario.name, scenario.standing, portedRead(scenario))
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
    })
  }
})

describe("the ported askPreCliffRestart answers what the code repository's answered", () => {
  for (const scenario of ASK_SCENARIOS) {
    it(scenario.name, async () => {
      const answered = await portedAsk(scenario)
      const cut = scenario.portedNotice !== null
      const verdict = hold(
        scenario.name,
        cut ? reasonless(scenario.standing) : scenario.standing,
        cut ? reasonless(answered) : answered
      )
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
    })
  }
})

describe("the validator's own words, where the two sides part", () => {
  for (const scenario of ASK_SCENARIOS.filter((one) => one.portedNotice !== null)) {
    it(scenario.name, async () => {
      const answered = await portedAsk(scenario)
      expect(answered.notice).toBe(scenario.portedNotice)
      expect(answered.logged).toEqual([`[local] ${scenario.portedNotice ?? ""}${TAIL}`])
      expect(scenario.standing.notice).not.toBe(scenario.portedNotice)
    })
  }
})
