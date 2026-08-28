import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check } from "../lib/check.ts"
import { judge, over, skip } from "../../outcome/outcome"
import { diskFileTree } from "../../page/file-tree.ts"
import { PROPERTY_GLOBS } from "../../page/page-types.ts"
import { DEFAULT } from "../../page/property/declarations.ts"
import { blockOf, stringAt } from "../../page/text/text.ts"
import { refusalText } from "../../refusal/refusal.ts"

const NAME = "defaults-not-required"

const UNIT = "property definition(s)"

const REQUIRED = "required"

const SHOWN = 12

const first = (lines: readonly string[]): readonly string[] =>
  lines.length > SHOWN ? [...lines.slice(0, SHOWN), `and ${lines.length - SHOWN} more`] : lines

export const defaultsNotRequired: Check = (repo) => {
  const tree = diskFileTree(repo.roots)
  const standing = tree.paths(PROPERTY_GLOBS)
  if (standing.length === 0) {
    return {
      ...skip(
        NAME,
        `nothing stands at \`${PROPERTY_GLOBS.join("` or `")}\`, so no property definition states a default here`
      ),
      population: over(0, UNIT),
    }
  }

  const refusals: string[] = []
  const unread: string[] = []
  let judged = 0
  let defaulted = 0
  for (const relPath of standing) {
    const text = tree.open(relPath)
    if (text === null) {
      unread.push(`${relPath} — it could not be read, so nothing here says whether it states both`)
      continue
    }
    const { fm, why } = blockOf(text)
    if (why !== null) {
      unread.push(`${relPath} — ${why}`)
      continue
    }
    judged += 1
    if (!fm.fields.has(DEFAULT)) continue
    defaulted += 1
    if (stringAt(fm, REQUIRED) !== "true") continue
    refusals.push(
      refusalText("property-default-and-required", { path: relPath }, rootFor(repo.roots, AKASHA))
    )
  }

  const detail =
    `${defaulted} of ${judged} property definition(s) state a \`${DEFAULT}:\`, and ${refusals.length} of those ` +
    `also state \`${REQUIRED}: true\``
  return { ...judge(NAME, detail, first([...refusals, ...unread])), population: over(judged, UNIT) }
}
