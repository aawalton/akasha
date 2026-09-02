import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { AsyncCheck } from "../lib/check.ts"
import { commandSet } from "../ops/set.ts"
import { judge, over } from "@akasha/verdict/outcome"
import { refusalText } from "../../refusal/refusal.ts"

const NAME = "commands-declare-summary"

// A SUMMARY IS READ FROM FILE TEXT, SO NO MODULE NEEDS TO LOAD FOR THIS TO ANSWER. `declared.ts:50`
// fills `summary` from `summaryIn(source)`, a regex over the source, and `commandSet()` carries that
// value whether or not the module would import.
//
// This used to call `commandSurface()`, which loads every module because `commands-declare-help`
// needs `module.help`. A single load failure aborted this check and printed
// `command-help-surface-unread` — a refusal about help, from the check that reads summaries, over a
// field no load can affect. It also zeroed the population, so a surface this check could have
// counted in full read as nothing counted. `commandSet()` is the same set of commands, minus the
// loading, so there is no unreadable-surface case here to refuse.
export const commandsDeclareSummary: AsyncCheck = async (repo) => {
  const verbs = commandSet()
  const messages: string[] = []
  for (const one of verbs) {
    if (one.summary.trim() !== "") continue
    messages.push(
      refusalText(
        "command-declares-no-summary",
        { command: one.path.join(" "), source: one.source ?? "unknown" },
        rootFor(repo.roots, AKASHA)
      )
    )
  }
  return {
    ...judge(
      NAME,
      `${verbs.length} command(s) declared here, ${messages.length} without a summary`,
      messages
    ),
    population: over(verbs.length, "command declared in this repository"),
  }
}
