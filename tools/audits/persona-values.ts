
import type { Check } from "../lib/check.ts"
import { textField } from "../../page/frontmatter.ts"
import { judge, over } from "../../outcome/outcome"
import { fromDisk, refusalText } from "../lib/refusal.ts"
import { COLOR_KEY, VALUE_KEY } from "../lib/seat-value.ts"
import { documentsOfType } from "../lib/pages-of-type.ts"
import { defaultFor, documentFor, scan } from "../lib/seat-resolve.ts"

const PERSONA_TYPE = "persona"
const VALUE_TYPE = "value"

export const personaValues: Check = (repo) => {
  const root = repo.roots.akasha
  const found = scan(root)
  const failures: string[] = []

  const byDefault = defaultFor("persona", root)
  const at = byDefault === null ? null : documentFor("persona", byDefault, root)
  const exempt = new Set(at === null ? [] : [at])

  const personas = documentsOfType(repo.roots, repo.name, repo.documents, PERSONA_TYPE)
  const values = documentsOfType(repo.roots, repo.name, repo.documents, VALUE_TYPE)
  const isValue = new Set(values)

  for (const relPath of values) {
    const fm = found.docs.frontmatterOf(relPath)
    if (fm === null) continue
    if (textField(fm, COLOR_KEY) !== null) continue
    failures.push(
      refusalText("alan-value-no-color", { path: relPath, key: COLOR_KEY }, root, fromDisk)
    )
  }

  for (const relPath of personas) {
    const fm = found.docs.frontmatterOf(relPath)
    if (fm === null) continue
    if (exempt.has(relPath)) continue
    const slug = textField(fm, VALUE_KEY)
    if (slug === null) {
      failures.push(
        refusalText("persona-value-unnamed", { path: relPath, key: VALUE_KEY }, root, fromDisk)
      )
      continue
    }
    const at = found.docs.domainAt(slug)
    if (at === null) {
      failures.push(
        refusalText(
          "persona-value-unresolved",
          { path: relPath, key: VALUE_KEY, slug },
          root,
          fromDisk
        )
      )
      continue
    }
    if (isValue.has(at)) continue
    failures.push(
      refusalText(
        "persona-value-not-a-value",
        { path: relPath, key: VALUE_KEY, slug, at, dir: VALUE_TYPE },
        root,
        fromDisk
      )
    )
  }

  return {
    ...judge(
      "persona-values",
      `${personas.length} persona(s) against ${values.length} page(s) of the \`${VALUE_TYPE}\` page type`,
      failures
    ),
    population: over(personas.length + values.length, "document(s) the value edge runs between"),
  }
}
