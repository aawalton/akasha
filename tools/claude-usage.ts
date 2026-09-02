#!/usr/bin/env bun

import { type FleetUsage, readFleetUsage } from "./lib/claude-account-usage.ts"

const HELP = `bun tools/claude-usage.ts — what the Claude fleet has spent of its two windows

Prints one JSON object on stdout and nothing else:

  { "session": { "value": <number|null>, "over": <count> },
    "weekly":  { "value": <number|null>, "over": <count> } }

\`value\` is the mean percentage spent across the accounts that carried a figure and \`over\`
is how many carried one. An account with no reading is left out of the mean rather than
counted as having spent nothing. A checkout naming no claude-account is an error rather
than a fleet that has spent nothing, because zero across the board is a reading Alan would
act on and pages going unread is not.

THE EDITOR'S TWO USAGE SLOTS ASK THIS AS A CHILD, AND THAT IS THE WHOLE REASON IT EXISTS.

\`readFleetUsage\` reaches \`readingsIn\`, which loads each account's page body, and a body is
loaded with \`Bun.Transpiler\`. The extension host is node — Electron forks it as a utility
process under its own node build — so in the host that reach throws:

  a page body is loaded with \`Bun.Transpiler\`, which only bun carries, and this runtime
  holds no \`Bun\` global

\`status-bar/activate.ts\` gathers its four reads with \`Promise.allSettled\`, so the throw was
swallowed into a stale slot and both numbers drew \`—\` with a tooltip saying "no successful
poll yet". Nothing failed loudly and activation was clean. Measured by
\`tools/extension-panels-draw.ts\`, which runs the real \`activate()\` under node and reads the
slots back; the same call answers 8 accounts under bun, which is why running it by hand
never showed it.

The work tree and the page tree already ask their children for the same reason.

  --help  This.
`

export function main(argv: readonly string[]): number {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  const unknown = argv.filter((arg) => arg.startsWith("-"))
  if (unknown.length > 0) {
    process.stderr.write(`error: this command takes no flags, and was given ${unknown.join(" ")}\n`)
    return 1
  }
  try {
    const usage: FleetUsage = readFleetUsage()
    process.stdout.write(`${JSON.stringify(usage)}\n`)
  } catch (err) {
    process.stderr.write(`error: ${err instanceof Error ? err.message : String(err)}\n`)
    return 3
  }
  return 0
}

if (import.meta.main) process.exitCode = main(process.argv.slice(2))
