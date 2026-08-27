export const summary = "Ask Alan a question when you need his input (#15489): open a `question` page linked to your persona and push it to Alan via the notify() chokepoint, deep-linked to the question page's answering surface. Persona-backed; hold as many open questions as you have things to ask, and retry-safe on the question text — an identical re-ask returns the open one with no second push (--question, --from/--agent-id, --context, --option, --json)"

import type { CommandHelp } from "../ops/surface.ts"
import { InputError } from "../lib/active-core.ts"
import { type AskAlanResult, runAskAlan } from "../lib/ask-alan.ts"
import { inputError } from "../lib/exit.ts"
import { parseArgs } from "../lib/parse-args.ts"
import { resolveSeatTargetFromFlagOrEnv } from "../lib/seat-handle.ts"

export const help: CommandHelp = {
  irreversible: "irreversible",
  flags: [
    {
      name: "--question",
      argLabel: "<text>",
      valueShape: "prose",
      required: true,
      description: "The question to ask Alan",
    },
    {
      name: "--from",
      argLabel: "<uuid|name|prefix>",
      valueShape: "token",
      description: "Asking agent identity (defaults to $AGENT_ID); alias --agent-id",
    },
    {
      name: "--agent-id",
      argLabel: "<uuid|name|prefix>",
      valueShape: "token",
      description: "Alias for --from",
    },
    {
      name: "--context",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Optional tl;dr orientation so Alan can answer from the question alone",
    },
    {
      name: "--option",
      argLabel: "<text>",
      valueShape: "prose",
      repeat: true,
      description: "A quick-answer choice (repeatable) rendered as a tappable response",
    },
    { name: "--json", description: "Emit the full result as JSON" },
  ],
  envVars: [
    { name: "AGENT_ID", description: "Fallback asking-agent id when --from/--agent-id is absent" },
  ],
  examples: [
    "ops ask-alan --question-file ./question.md",
    "ops ask-alan --from athena --question-file ./question.md --json",
    "ops ask-alan --question-file ./question.md --context-file ./context.md --option-file ./option-1.md --option-file ./option-2.md",
  ],
}

export default async function askAlan(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const question = parsed.requireString("--question")

  const agentId = await resolveSeatTargetFromFlagOrEnv(
    parsed.string("--from") ?? parsed.string("--agent-id")
  )
  const context = parsed.string("--context")
  const options = parsed.repeated("--option")

  let result: AskAlanResult
  try {
    result = await runAskAlan(agentId, question, { context, options })
  } catch (thrown) {
    if (thrown instanceof InputError) throw inputError(thrown.message)
    throw thrown
  }

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(result)}\n`)
    return
  }
  process.stdout.write(`${result.questionId}\tcreated=${result.created}\n`)
}
