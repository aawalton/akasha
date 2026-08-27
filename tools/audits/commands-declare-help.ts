
import type { AsyncCheck } from "../lib/check.ts"
import { commandSurface } from "../lib/command-surface.ts"
import { judge, over } from "../../outcome/outcome"
import { fromDisk, refusalText } from "../lib/refusal.ts"

const NAME = "commands-declare-help"

export const commandsDeclareHelp: AsyncCheck = async (repo) => {
  const { verbs, unreadable } = await commandSurface()

  if (unreadable.length > 0) {
    return {
      ...judge(NAME, `${unreadable.length} command(s) would not load, so no help could be read from them`, [
        refusalText(
          "command-help-surface-unread",
          { count: String(unreadable.length), detail: unreadable.slice(0, 5).join("; ") },
          repo.roots.akasha,
          fromDisk
        ),
      ]),
      population: over(0, "command whose help could be read"),
    }
  }

  const messages: string[] = []
  for (const verb of verbs) {
    if (verb.source === null) continue
    if ((verb.document?.help ?? "").trim() !== "") continue
    messages.push(
      refusalText(
        "command-help-no-description",
        { command: verb.command, source: verb.source ?? "unknown" },
        repo.roots.akasha,
        fromDisk
      )
    )
  }

  return {
    ...judge(NAME, `${verbs.length} command(s) read, ${messages.length} whose document holds no Help section`, messages),
    population: over(verbs.length, "command read for its help"),
  }
}
