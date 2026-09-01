import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { AsyncCheck } from "../lib/check.ts"
import { commandSurface } from "../lib/command-surface.ts"
import { judge, over } from "@akasha/verdict/outcome"
import { refusalText } from "../../refusal/refusal.ts"

const NAME = "commands-declare-summary"

export const commandsDeclareSummary: AsyncCheck = async (repo) => {
  // Read the whole command surface rather than the `tools/commands` folder alone.
  // `declaredCommands` was rooted at a literal `tools/commands`, so every command
  // declared anywhere else was outside the denominator and a clean count here said
  // nothing about it. The surface is the same set `commands-declare-help` reads.
  const { verbs, unreadable } = await commandSurface()
  if (unreadable.length > 0) {
    return {
      ...judge(
        NAME,
        `${unreadable.length} command(s) would not load, so no summary could be read from them`,
        [
          refusalText(
            "command-help-surface-unread",
            { count: String(unreadable.length), detail: unreadable.slice(0, 5).join("; ") },
            rootFor(repo.roots, AKASHA)
          ),
        ]
      ),
      population: over(0, "command whose summary could be read"),
    }
  }
  const messages: string[] = []
  for (const one of verbs) {
    if (one.summary.trim() !== "") continue
    messages.push(
      refusalText(
        "command-declares-no-summary",
        { command: one.command, source: one.source ?? "unknown" },
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
