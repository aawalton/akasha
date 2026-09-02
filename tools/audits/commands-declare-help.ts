import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { AsyncCheck } from "../lib/check.ts"
import { commandSurface } from "../lib/command-surface.ts"
import { judge, over } from "@akasha/verdict/outcome"
import { refusalText } from "../../refusal/refusal.ts"

const NAME = "commands-declare-help"

export const commandsDeclareHelp: AsyncCheck = async (repo) => {
  const { verbs, unreadable } = await commandSurface()
  const root = rootFor(repo.roots, AKASHA)

  if (unreadable.length > 0) {
    return {
      ...judge(
        NAME,
        `${unreadable.length} command(s) would not load, so no help could be read from them`,
        [
          refusalText(
            "command-help-surface-unread",
            { count: String(unreadable.length), detail: unreadable.slice(0, 5).join("; ") },
            root
          ),
        ]
      ),
      population: over(0, "command whose help could be read"),
    }
  }

  // What is tested is where the help lives: the document's Help section, because
  // `old-ops-command.page-type.md` says every command's help belongs in its own document. What is
  // printed used to be about what the reader sees, and those are not the same thing.
  // `renderCommandHelp` at `tools/ops/render.ts` reads `cmd.document?.help ?? help.description`, so
  // a command declaring a description in code renders that description and the old message called it
  // silent. Eleven of the fourteen this first refused were rendering prose the whole time; one of
  // them was 1641 characters.
  //
  // So the code's description is read too, and only to decide which of two refusals to print. A
  // command with one needs its prose moved; a command without one needs its prose written. Those
  // are minutes and hours, and a caller cannot tell them apart from a count.
  const messages: string[] = []
  let inCode = 0
  for (const verb of verbs) {
    if (verb.source === null) continue
    if ((verb.document?.help ?? "").trim() !== "") continue
    const described = (verb.help.description ?? "").trim()
    if (described === "") {
      messages.push(
        refusalText("command-help-no-description", { command: verb.command, source: verb.source }, root)
      )
      continue
    }
    inCode += 1
    messages.push(
      refusalText(
        "command-help-declared-in-code",
        { command: verb.command, source: verb.source, length: String(described.length) },
        root
      )
    )
  }

  const split =
    messages.length === 0
      ? ""
      : `, ${inCode} of them declaring one in code instead and ${messages.length - inCode} declaring none anywhere`
  return {
    ...judge(
      NAME,
      `${verbs.length} command(s) read, ${messages.length} whose document holds no Help section${split}`,
      messages
    ),
    population: over(verbs.length, "command read for its help"),
  }
}
