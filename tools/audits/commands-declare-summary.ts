import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check } from "../lib/check.ts"
import { judge, over } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"
import { declaredCommands } from "../ops/declared.ts"

const NAME = "commands-declare-summary"

export const commandsDeclareSummary: Check = (repo) => {
  const commands = declaredCommands(rootFor(repo.roots, AKASHA))
  const messages: string[] = []
  for (const one of commands) {
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
      `${commands.length} command(s) declared here, ${messages.length} without a summary`,
      messages
    ),
    population: over(commands.length, "command declared in this repository"),
  }
}
