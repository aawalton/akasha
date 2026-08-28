import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { commandSurface, type CommandSurface } from "../lib/command-surface.ts"
import type { AsyncCheck } from "../lib/check.ts"
import { judge, over } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"
import type { HelpFlag, HelpPositional } from "../ops/surface.ts"
import {
  deriveSubjectIdentifierFlags,
  findPositionalAliasViolations,
  type PositionalShape,
  type RequiredValueFlag,
  type CommandArgShape,
} from "../lib/positional-alias.ts"

const NAME = "positionals-cover-identifiers"

function requiredValueFlags(flags: readonly HelpFlag[]): readonly RequiredValueFlag[] {
  const found: RequiredValueFlag[] = []
  for (const flag of flags) {
    if (flag.required !== true) continue
    if (flag.repeat === true) continue
    if (flag.valueShape === undefined) continue
    found.push({ name: flag.name, valueShape: flag.valueShape })
  }
  return found
}

function positionals(declared: readonly HelpPositional[]): readonly PositionalShape[] {
  return declared.map((one) => ({
    name: one.name,
    aliasOfFlag: one.aliasOfFlag,
    description: one.description,
  }))
}

function argShapeOf(verb: CommandSurface): CommandArgShape {
  return {
    command: verb.command,
    requiredValueFlags: requiredValueFlags(verb.help.flags ?? []),
    positionals: positionals(verb.help.positionals ?? []),
  }
}

export const positionalsCoverIdentifiers: AsyncCheck = async (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const { verbs, unreadable } = await commandSurface()

  if (unreadable.length > 0) {
    return {
      ...judge(
        NAME,
        `${unreadable.length} verb(s) would not load, so the vocabulary is derived from a short surface`,
        unreadable.map((detail) => refusalText("command-surface-unread", { detail }, root))
      ),
      population: over(0, "verb(s)"),
    }
  }

  const shapes = verbs.map(argShapeOf)
  const vocabulary = deriveSubjectIdentifierFlags(shapes)
  const violations = findPositionalAliasViolations(shapes, vocabulary)

  const messages = violations.map((one) =>
    one.problem === "missing-positional-alias"
      ? refusalText(
          "positional-alias-missing",
          {
            command: one.command,
            identifiers: one.identifiers.join(", "),
            first: one.identifiers[0] ?? "",
          },
          root
        )
      : refusalText(
          "positional-alias-note-doubled",
          { command: one.command, positional: one.positional },
          root
        )
  )

  return {
    ...judge(
      NAME,
      `${vocabulary.size} identifier flag(s) derived from the surface itself, over ${shapes.length} verb(s)`,
      messages
    ),
    population: over(shapes.length, "verb(s)"),
  }
}
