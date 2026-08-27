import { describe, expect, test } from "bun:test"
import { type AttributedOpenQuestion, selectQuestionsAskedBy } from "../lib/attention-question.ts"

const HANDLER_ID = "019fae20-f9f8-7b61-b472-6e80f4b805f2"
const OTHER_ID = "01a0004d-0dd4-7a23-94c1-fea622cd277a"
const TRACKING = "tracking-hourly-confirm"

const q = (id: string, sourceContext: string): AttributedOpenQuestion => ({
  id,
  title: `q-${id}`,
  createdAtMs: 100,
  sourceContext,
})

const kept = (questions: readonly AttributedOpenQuestion[], agentId: string): string[] =>
  selectQuestionsAskedBy(questions, agentId).map((one) => one.id)

describe("a question is answerable only in the conversation it was asked in", () => {
  test("an agent answers the question it asked itself", () => {
    expect(kept([q("own", HANDLER_ID)], HANDLER_ID)).toEqual(["own"])
  })

  test("two seats sharing one persona do not answer for each other", () => {
    const persona = [q("handler", HANDLER_ID), q("other", OTHER_ID)]
    expect(kept(persona, HANDLER_ID)).toEqual(["handler"])
    expect(kept(persona, OTHER_ID)).toEqual(["other"])
  })

  test("the hourly tracking stream is answerable in no seat at all", () => {
    for (const seat of [HANDLER_ID, OTHER_ID]) {
      expect(kept([q("hourly", TRACKING)], seat)).toEqual([])
    }
  })

  test("a marker no seat owns is answerable nowhere", () => {
    expect(kept([q("stray", "some-other-automation")], HANDLER_ID)).toEqual([])
  })

  test("a question naming no source at all is answerable nowhere", () => {
    expect(kept([q("blank", "")], HANDLER_ID)).toEqual([])
  })

  test("a mixed queue keeps only this agent's questions, in order", () => {
    const queue = [
      q("stream", TRACKING),
      q("mine-old", HANDLER_ID),
      q("sibling", OTHER_ID),
      q("mine-new", HANDLER_ID),
    ]
    expect(kept(queue, HANDLER_ID)).toEqual(["mine-old", "mine-new"])
  })
})
