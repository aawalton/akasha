export const summary = "Triage an exit-123 on a consolidated fan-out pod by scanning the FULL multi-workspace log for fail>0 — never a tail/last-summary proxy"

import type { CommandHelp } from "../../ops/surface.ts"
import "../../lib/command-entry.ts"
import {
  analyzeFanoutLog,
  decideTriageExit,
  normalizeLogInput,
} from "../../lib/triage-fanout-log.ts"
import { renderResult } from "../../lib/triage-fanout-render.ts"

const PREFIX = "[triage-fanout]"

export const help: CommandHelp = {
  flags: [],
  examples: [
    "ops loki logs <pod> --all | ops tests triage-fanout",
    "ops pipeline logs --seq <n> --workflow checks --step check-unit-tests --all | ops tests triage-fanout",
    "ops tests triage-fanout < captured-fanout.log",
  ],
}

export default async function testsTriageFanout(args: readonly string[]): Promise<void> {
  for (const a of args) {
    if (a === "--help" || a === "-h") continue
    console.error(`${PREFIX} unexpected argument: ${a}; this command reads the log from stdin`)
    process.exit(64)
  }

  const stdin = await Bun.stdin.text()
  const lines = normalizeLogInput(stdin)
  if (lines.length === 0) {
    console.error(
      `${PREFIX} empty input on stdin; pipe a COMPLETE consolidated fan-out pod log ` +
        "(e.g. `ops loki logs <pod> --all | ops tests triage-fanout`)"
    )
    process.exit(2)
  }

  const result = analyzeFanoutLog(lines, Date.now())
  console.log(renderResult(result))
  process.exit(decideTriageExit(result))
}
