
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { parseModel, toDisplay } from "../lib/model-vocab.ts"
import { extractServedModel } from "../lib/session-jsonl.ts"

const assistant = (model: string, text = "ok"): string =>
  JSON.stringify({ type: "assistant", message: { model, content: [{ type: "text", text }] } })

const death = JSON.stringify({
  type: "assistant",
  isApiErrorMessage: true,
  apiErrorStatus: 429,
  error: "rate_limit",
  message: {
    model: "<synthetic>",
    content: [{ type: "text", text: "You've hit your weekly limit" }],
  },
})

const userLine = JSON.stringify({ type: "user", message: { content: "resume please" } })
const noModel = JSON.stringify({ type: "assistant", message: { content: [] } })

const SERVED_VECTORS: readonly {
  readonly label: string
  readonly text: string
  readonly standing: string | null
}[] = [
  { label: "a healthy last assistant turn", text: assistant("claude-opus-4-8"), standing: "claude-opus-4-8" },
  {
    label: "the last real served model wins, post-fallback",
    text: `${assistant("claude-fable-5")}\n${assistant("claude-opus-4-8")}`,
    standing: "claude-opus-4-8",
  },
  {
    label: "a terminal synthetic death line is skipped",
    text: `${assistant("claude-opus-4-8")}\n${death}`,
    standing: "claude-opus-4-8",
  },
  {
    label: "an extended [1m] wire id is preserved verbatim",
    text: assistant("claude-opus-4-8[1m]"),
    standing: "claude-opus-4-8[1m]",
  },
  { label: "null when only a synthetic death line stands", text: death, standing: null },
  { label: "null for an empty transcript", text: "", standing: null },
  { label: "null when no assistant line stands", text: userLine, standing: null },
  { label: "null when an assistant line carries no model", text: noModel, standing: null },
]

describe("which model served, held by digest", () => {
  for (const vector of SERVED_VECTORS) {
    it(vector.label, () => {
      const verdict = hold(vector.label, vector.standing, extractServedModel(vector.text))
      expect(verdict.matches).toBe(true)
    })
  }
})

interface VocabularyAnswer {
  readonly spec: { readonly logical: string; readonly extended: boolean } | null
  readonly display: string | null
}

const ASSERTED: readonly { readonly raw: string; readonly standing: VocabularyAnswer }[] = [
  { raw: "opus", standing: { spec: { logical: "opus", extended: false }, display: "opus" } },
  { raw: "fable[1m]", standing: { spec: { logical: "fable", extended: true }, display: "fable [1m]" } },
  { raw: "claude-opus-5", standing: { spec: { logical: "opus", extended: false }, display: "opus" } },
  { raw: "claude-opus-5[1m]", standing: { spec: { logical: "opus", extended: true }, display: "opus [1m]" } },
  { raw: "claude-opus-4-8", standing: { spec: { logical: "opus", extended: false }, display: "opus" } },
  { raw: "claude-opus-4-8[1m]", standing: { spec: { logical: "opus", extended: true }, display: "opus [1m]" } },
  { raw: "claude-fable-5[1m]", standing: { spec: { logical: "fable", extended: true }, display: "fable [1m]" } },
  { raw: "claude-sonnet-5[1m]", standing: { spec: { logical: "sonnet", extended: true }, display: "sonnet [1m]" } },
  { raw: "  opus[1m]  ", standing: { spec: { logical: "opus", extended: true }, display: "opus [1m]" } },
  { raw: "", standing: { spec: null, display: null } },
  { raw: "   ", standing: { spec: null, display: null } },
  { raw: "gpt-4", standing: { spec: null, display: null } },
  { raw: "[1m]", standing: { spec: null, display: null } },
  { raw: "claude-unknown-9", standing: { spec: null, display: null } },
]

const RECORDED: readonly { readonly raw: string; readonly standing: VocabularyAnswer }[] = [
  { raw: "claude-haiku-4-5", standing: { spec: { logical: "haiku", extended: false }, display: "haiku" } },
  { raw: "claude-fable-5", standing: { spec: { logical: "fable", extended: false }, display: "fable" } },
]

function answer(raw: string): VocabularyAnswer {
  const spec = parseModel(raw)
  return { spec: spec === null ? null : { ...spec }, display: spec === null ? null : toDisplay(spec) }
}

describe("the vocabulary a wire id is lifted through, held by digest", () => {
  for (const vector of ASSERTED) {
    it(`parses and displays ${JSON.stringify(vector.raw)}`, () => {
      const verdict = hold(vector.raw, vector.standing, answer(vector.raw))
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
    })
  }

  for (const vector of RECORDED) {
    it(`parses and displays ${JSON.stringify(vector.raw)}, against a recording`, () => {
      const verdict = hold(vector.raw, vector.standing, answer(vector.raw))
      expect(verdict.matches).toBe(true)
    })
  }
})
