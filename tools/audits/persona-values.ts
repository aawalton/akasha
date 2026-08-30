import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check } from "../lib/check.ts"
import { textField } from "../../page/frontmatter.ts"
import { judge, over } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"
import { COLOR_KEY, VALUE_KEY } from "../lib/seat-value.ts"
import { personasStanding } from "../lib/akasha-personas.ts"
import { documentsOfType } from "../lib/pages-of-type.ts"
import { defaultFor, scan } from "../lib/seat-resolve.ts"

const VALUE_TYPE = "value"

export const personaValues: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const found = scan(root)
  const failures: string[] = []

  const exempt = defaultFor("persona", root)

  const personas = personasStanding(root)
  const values = documentsOfType(repo.roots, repo.name, repo.documents, VALUE_TYPE)
  const isValue = new Set(values)

  for (const relPath of values) {
    const fm = found.docs.frontmatterOf(relPath)
    if (fm === null) continue
    if (textField(fm, COLOR_KEY) !== null) continue
    failures.push(refusalText("alan-value-no-color", { path: relPath, key: COLOR_KEY }, root))
  }

  for (const persona of personas) {
    if (persona.slug === exempt) continue
    const relPath = persona.path
    const slug = persona.valueSlug
    if (slug === null) {
      failures.push(refusalText("persona-value-unnamed", { path: relPath, key: VALUE_KEY }, root))
      continue
    }
    const at = found.docs.domainAt(slug)
    if (at === null) {
      failures.push(
        refusalText("persona-value-unresolved", { path: relPath, key: VALUE_KEY, slug }, root)
      )
      continue
    }
    if (isValue.has(at)) continue
    failures.push(
      refusalText(
        "persona-value-not-a-value",
        { path: relPath, key: VALUE_KEY, slug, at, dir: VALUE_TYPE },
        root
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
