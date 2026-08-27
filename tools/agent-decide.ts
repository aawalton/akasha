
import { AGENT_RULE_DECISIONS } from "./lib/agent-decide-rules.ts"
import { readPayload, record, rejectUnknownFlags } from "./lib/payload.ts"
import { fail } from "./lib/command.ts"

const DECISIONS: Readonly<Record<string, (value: unknown, path: string) => unknown>> = {
  ...AGENT_RULE_DECISIONS,
}

const KEYS: readonly string[] = Object.keys(DECISIONS)

export function answer(payload: Record<string, unknown>): Record<string, unknown> {
  const asked = Object.keys(payload)
  if (asked.length === 0) {
    fail(`the payload asks nothing — this command takes ${KEYS.join(", ")}`)
  }
  const stray = asked.filter((key) => !KEYS.includes(key))
  if (stray.length > 0) {
    fail(`\`${stray.join("`, `")}\` names no decision this command makes — it takes ${KEYS.join(", ")}`)
  }
  const answers: Record<string, unknown> = {}
  for (const key of asked) {
    const decide = DECISIONS[key]
    if (decide === undefined) continue
    answers[key] = decide(payload[key], key)
  }
  return answers
}

function rejectArguments(argv: readonly string[]): void {
  rejectUnknownFlags(argv, [], [])
  const [first] = argv
  if (first !== undefined) {
    fail(`\`${first}\` is an argument and this command takes none — the whole call is the JSON on stdin`)
  }
}

async function main(): Promise<void> {
  rejectArguments(process.argv.slice(2))
  const payload = record(await readPayload("-"), "the payload")
  process.stdout.write(`${JSON.stringify(answer(payload), null, 2)}\n`)
}

if (import.meta.main) await main()
