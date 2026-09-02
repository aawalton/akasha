#!/usr/bin/env bun

import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { seatPageAt, subagentPagesStanding } from "./lib/agent-pages.ts"
import { sayAnswer } from "./lib/answer.ts"
import { readSeatForest } from "./lib/seat-forest.ts"
import { colorOfState } from "./lib/seat-turn-color.ts"
import { seatTurnStateOf } from "./lib/seat-turn-state.ts"

const HELP = `bun tools/agent-forest.ts — the seats a seat tree is drawn from

Prints one JSON object on stdout and nothing else:

  { "repo",
    "rows": [ { "id", "name", "parent_agent_id", "principal", "launch", "mode",
                "live", "state", "waitingOn", "color", "at" }, … ],
    "subagents": [ { "seat", "own", "at" }, … ] }

Every seat is read from its page in the memory repository and never from a row. A seat
standing in that repository with an agent present in it reads \`live\` true. One with
\`live\` false is an ancestor fetched back in because something under it is present, which
is how a departed seat keeps a live branch attached to the root it belongs under; its page
is read from the newest commit that held it where the working tree no longer does.

\`name\` is the seat's own name, which is what its page is called. \`principal\` is the person
the seat's page names, or \`agent\` where it names a seat above it instead, and \`launch\` reads
\`opened\` for the first and \`spawned\` for the second. A page stating neither carries neither.
\`mode\` is the mode the seat's page states it starts in, which is an attribute of its own and
is not derivable from \`launch\`.
A value that is not a string reads as absent rather than as its own rendering.

\`state\` is \`working\`, \`idle-pending\`, \`idle\` or \`stopped\`, read from what the seat
itself keeps rather than from the page. Three of the four are stamped by a hook as the turn moves:
working while a turn or a compaction runs, idle once one ends, stopped once the session does.
The fourth is read rather than stamped — an idle seat whose turn start source names anything but
\`none\` is \`idle-pending\`, and \`waitingOn\` says what it waits on. A seat keeping no turn record at all has taken no turn and reads
\`stopped\`, which is what a seat whose session never started holds; one keeping records from
before the stamps reads idle. Every row carries both keys.

\`color\` is the color that state's domain states in the instructions repository, named rather
than specified, so whatever draws it picks the shade from its own palette. Every state names a
domain that states one, so this reads null only for a seat keeping no records at all.

\`repo\` is the akasha checkout every path here was resolved against, and \`at\` is a path inside
it, so a caller joins the two rather than keeping a second copy of where the repository sits.

\`at\` IS THERE ONLY WHERE THE PAGE IS. A row reads null rather than naming a page that is not
standing, which is what a seat read back from a commit holds and what a seat that stopped between
the walk and this line holds. Every path printed was opened while this answer was composed and
made to declare the id the row carries, so a path the index still names for a page that has gone
is answered as no path at all rather than as one that will not open.

\`subagents\` is every subagent page akasha holds, keyed by the seat that ran the subagent and the
id the subagent runs under — the two facts a subagent's page is named for, both read off the page.
Which subagents are running is not answered here and cannot be: it is read from what each seat is
doing. These are the pages, for a caller holding the running ones to join against.

  --help  This.
`

export async function main(argv: readonly string[]): Promise<number> {
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
    const repo = akashaRoot()
    const rows = readSeatForest().map((row) => {
      const reading = seatTurnStateOf(row.id)
      return {
        ...row,
        state: reading.state,
        waitingOn: reading.waitingOn,
        color: colorOfState(reading.state),
        at: seatPageAt(row.id, repo),
      }
    })
    sayAnswer(`${JSON.stringify({ repo, rows, subagents: subagentPagesStanding(repo) })}\n`)
  } catch (err) {
    process.stderr.write(`error: ${err instanceof Error ? err.message : String(err)}\n`)
    return 3
  }
  return 0
}

if (import.meta.main) process.exitCode = await main(process.argv.slice(2))
