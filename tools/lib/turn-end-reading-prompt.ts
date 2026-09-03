import { shape } from "@akasha/utils-narrow/shape"
import type { TurnEvidence } from "./turn-end-reading-evidence.ts"

const streamEventSchema = shape.looseObject({
  type: shape.string(),
  delta: shape.looseObject({ type: shape.string(), text: shape.string().optional() }).optional(),
})

const answerSchema = shape.looseObject({
  line: shape.string(),
  why: shape.string(),
  verdict: shape.string(),
})

export interface ReaderAnswer {
  readonly line: string
  readonly why: string
  readonly verdict: string
}

export const READER_IDENTITY =
  "You read how one turn ended, for an AI agent working in a seat. Its principal is Alan."

export function buildReadingInstructions(conduct: string): string {
  return [
    "Answer one question: will this ending annoy Alan?",
    "",
    "Everything below is the standing definition of what annoys Alan, read off disk as it",
    "stands now. Nothing outside it bears on the answer.",
    "",
    conduct,
    "",
    "# Otherwise",
    "",
    "Allow. Idle is where a seat is entitled to be, whether or not anything is outstanding.",
    "",
    "Refuse ONLY where one of the lines above says this ending annoys him. Quote that line",
    "word for word. Where you cannot quote one, allow: a standard you worked out",
    "yourself is not his, and stating one as though it were is the worst thing you can do here.",
    "",
    "Reply with ONLY a JSON object and no other prose, the keys in this order:",
    '{"line": "<the line above you are relying on, word for word, or empty to allow>", ' +
      '"why": "<what about this ending annoys him, addressed to the agent as `you`, under 25 ' +
      'words>", "verdict": "<allow or refuse>"}',
  ].join("\n")
}

export function wordsIn(text: string): number {
  const said = text.trim()
  return said === "" ? 0 : said.split(/\s+/).length
}

export function buildReadingUser(evidence: TurnEvidence): string {
  return [
    evidence.promptText === null
      ? "What started the turn could not be read from the transcript."
      : `What the agent was responding to:\n\n${evidence.promptText}`,
    "",
    evidence.pending
      ? "MECHANICAL FACT: when this turn ended, a background task, subagent or monitor armed" +
        " during it was still pending, so something WILL report back. This says only what is" +
        " still running. It says nothing about who the next act belongs to: a turn can hand the" +
        " next act to Alan while its own work is still running."
      : "MECHANICAL FACT: when this turn ended, nothing armed during it was still pending, so" +
        " nothing will report back on its own. This says only what is still running. It says" +
        " nothing about who the next act belongs to.",
    "",
    evidence.toolCalls === 0
      ? "MECHANICAL FACT: this turn made no tool call at all, so everything it produced was" +
        " text. Whatever it says about work, it read nothing and changed nothing."
      : `MECHANICAL FACT: this turn made ${evidence.toolCalls} tool call(s) before it ended.` +
        " This says only that it acted, never whether it finished what it set out to do.",
    "",
    evidence.trail.length === 0
      ? "The agent did nothing in this turn before its last message."
      : "What the agent did in this turn, in order, ending at its last act:\n\n" +
        evidence.trail.map((one) => `- ${one}`).join("\n"),
    "",
    `MECHANICAL FACT: the agent's last message — everything after its last tool call, and the` +
      ` whole of what Alan sees — is ${String(wordsIn(evidence.finalText))} word(s) long. It` +
      ` follows below in full.`,
    "",
    `How the agent's turn ended (its last message):\n\n${evidence.finalText}`,
  ].join("\n")
}

export function extractStreamText(body: string): string | null {
  let text = ""
  for (const line of body.split("\n")) {
    if (!line.startsWith("data:")) continue
    const payload = line.slice("data:".length).trim()
    if (payload === "") continue
    let parsed: ReturnType<typeof streamEventSchema.safeParse>
    try {
      parsed = streamEventSchema.safeParse(JSON.parse(payload))
    } catch {
      continue
    }
    if (!parsed.success) continue
    if (parsed.data.type === "error") return null
    if (parsed.data.type !== "content_block_delta") continue
    const delta = parsed.data.delta
    if (delta !== undefined && delta.type === "text_delta" && delta.text !== undefined)
      text += delta.text
  }
  const said = text.trim()
  return said === "" ? null : said
}

export function parseAnswer(text: string): ReaderAnswer | null {
  const fence = shape.array(shape.string()).safeParse(/```(?:json)?\s*([\s\S]*?)```/.exec(text))
  const candidate = fence.success ? (fence.data[1] ?? text) : text
  const start = candidate.indexOf("{")
  const end = candidate.lastIndexOf("}")
  if (start === -1 || end === -1 || end < start) return null
  try {
    const parsed = answerSchema.safeParse(JSON.parse(candidate.slice(start, end + 1)))
    if (!parsed.success) return null
    return {
      line: parsed.data.line.trim(),
      why: parsed.data.why.trim(),
      verdict: parsed.data.verdict.trim(),
    }
  } catch {
    return null
  }
}
