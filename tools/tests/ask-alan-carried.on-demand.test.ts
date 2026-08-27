
import { describe, expect, it } from "bun:test"
import { buildAskAlanNotifyInput, selectRetryMatch } from "../lib/ask-alan.ts"
import type { OpenQuestion } from "../lib/attention-question.ts"

interface AskResult {
  readonly personaSlug: string
  readonly questionId: string
  readonly created: boolean
  readonly notified: boolean
}

interface Scenario<T> {
  readonly result: T
  readonly notified: readonly { title: string; body?: string; link?: string; kind?: string; source?: string }[]
  readonly openQuestions: readonly { id: string; title: string; createdAtMs: number }[]
}

interface Observations {
  readonly twoDifferentQuestions: Scenario<{ first: AskResult; second: AskResult }>
  readonly burstOfThree: Scenario<null>
  readonly identicalReask: Scenario<{ first: AskResult; retry: AskResult }>
  readonly whitespaceOnlyDifference: Scenario<{ retry: AskResult }>
  readonly freshAsk: Scenario<AskResult>
}

function observe(): Observations {
  const armPath = new URL("./ask-alan-shell-arm.ts", import.meta.url).pathname
  const child = Bun.spawnSync(["bun", armPath])
  if (child.exitCode !== 0) {
    throw new Error(`the shell arm refused: ${child.stderr.toString().slice(0, 600)}`)
  }
  const lines = child.stdout.toString().trim().split("\n")
  return JSON.parse(lines[lines.length - 1] ?? "") as Observations
}

const seen = observe()

describe("askAlanForPersona", () => {
  it("fires a second notification for a second, different question", () => {
    const { result, notified } = seen.twoDifferentQuestions
    expect(notified.map((n) => n.body)).toEqual([
      "Should the migration land tonight?",
      "Which account should the pod rotate to?",
    ])
    expect(result.first.questionId).not.toBe(result.second.questionId)
    expect([result.first.created, result.second.created]).toEqual([true, true])
    expect([result.first.notified, result.second.notified]).toEqual([true, true])
  })

  it("keeps every question of a burst of asks reaching Alan", () => {
    expect(seen.burstOfThree.notified).toHaveLength(3)
    expect(seen.burstOfThree.openQuestions).toHaveLength(3)
  })

  it("does not double-notify an identical re-ask (a crash retry)", () => {
    const { result, notified, openQuestions } = seen.identicalReask
    expect(notified).toHaveLength(1)
    expect(openQuestions).toHaveLength(1)
    expect(result.retry.questionId).toBe(result.first.questionId)
    expect(result.retry.created).toBe(false)
    expect(result.retry.notified).toBe(false)
  })

  it("treats surrounding whitespace as the same ask, so a retry stays deduped", () => {
    expect(seen.whitespaceOnlyDifference.notified).toHaveLength(1)
    expect(seen.whitespaceOnlyDifference.result.retry.created).toBe(false)
  })

  it("reports the persona slug and a fresh question id on the open path", () => {
    expect(seen.freshAsk.result.personaSlug).toBe("zadi")
    expect(seen.freshAsk.result.questionId).toBe("question-1")
  })
})

describe("selectRetryMatch", () => {
  const q = (id: string, title: string): OpenQuestion => ({ id, title, createdAtMs: 1 })

  it("does not match a different question, so a second ask proceeds", () => {
    expect(selectRetryMatch([q("1", "Ship the migration?")], "Rotate the account?")).toBeUndefined()
  })

  it("does not match when a DIFFERENT asker's question is the only one open", () => {
    const open = [q("1", "Batch 1 of the persona review: do these 18 belong in 'activity'?")]
    expect(
      selectRetryMatch(open, "The merge queue has landed nothing for 78 minutes.")
    ).toBeUndefined()
  })

  it("matches the identical question, whichever position it holds", () => {
    const open = [q("1", "first"), q("2", "second"), q("3", "third")]
    expect(selectRetryMatch(open, "second")?.id).toBe("2")
  })

  it("matches nothing when the persona holds no open question", () => {
    expect(selectRetryMatch([], "anything")).toBeUndefined()
  })

  it("does not match on a prefix or a superstring", () => {
    const open = [q("1", "Ship the migration?")]
    expect(selectRetryMatch(open, "Ship the migration")).toBeUndefined()
    expect(selectRetryMatch(open, "Ship the migration? And the index?")).toBeUndefined()
  })
})

describe("buildAskAlanNotifyInput", () => {
  const base = {
    personaSlug: "zadi",
    question: "Which auth provider should the new endpoint use?",
    link: "/question/which-auth-provider-1de60a02",
  }

  it("maps the ask into the notify() chokepoint input", () => {
    expect(buildAskAlanNotifyInput(base)).toEqual({
      title: "zadi has a question",
      body: "Which auth provider should the new endpoint use?",
      link: "/question/which-auth-provider-1de60a02",
      kind: "ask-alan",
      source: "ask-alan",
    })
  })

  it("titles by the asking persona so Alan sees who at a glance", () => {
    expect(buildAskAlanNotifyInput({ ...base, personaSlug: "athena" }).title).toBe(
      "athena has a question"
    )
  })

  it("carries the question verbatim as the push body", () => {
    const q = "Ship the migration now, or wait for the review?"
    expect(buildAskAlanNotifyInput({ ...base, question: q }).body).toBe(q)
  })

  it("carries the host-relative question-page deep-link as the notification link (#15521)", () => {
    const link = "/question/ship-the-migration-1a2b3c4d"
    expect(buildAskAlanNotifyInput({ ...base, link }).link).toBe(link)
  })

  it("tags kind and source as ask-alan for the notifications view filters", () => {
    const input = buildAskAlanNotifyInput(base)
    expect(input.kind).toBe("ask-alan")
    expect(input.source).toBe("ask-alan")
  })
})
