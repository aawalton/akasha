import { answer } from "./page-query.ts"
import { type Initiatives, type InitiativeDoc } from "./work-tree.ts"
import { pageStemOf } from "../../page/name/name.ts"
import { type Roots } from "../../page/page.ts"
import { AKASHA } from "../../repo/roots/roots.ts"

const PAGE_TYPE = "initiative"

const SLUG_KEY = "slug"

const PARENT_KEY = "parent-slug"

const PERSONA_KEY = "persona-slug"

const ADDRESS = `${AKASHA}:`

function textAt(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const held = values[key]
  return typeof held === "string" && held.trim() !== "" ? held.trim() : null
}

export function askedInitiatives(roots: Roots): Initiatives {
  const found: InitiativeDoc[] = []
  for (const row of answer(roots, {
    pageType: PAGE_TYPE,
    keys: [SLUG_KEY, PARENT_KEY, PERSONA_KEY],
  })?.rows ?? []) {
    if (!row.at.startsWith(ADDRESS)) continue
    const relPath = row.at.slice(ADDRESS.length)
    found.push({
      slug: textAt(row.values, SLUG_KEY) ?? pageStemOf(relPath),
      relPath,
      parent: textAt(row.values, PARENT_KEY),
      persona: textAt(row.values, PERSONA_KEY),
    })
  }
  return { initiatives: found }
}
