
/**
 * The initiatives the work tree is drawn from, asked of the pages rather than scanned off disk.
 *
 * THE TREE IS NOT COMPOSED HERE. Which initiative stands under which is `workTree`'s answer, and
 * this only hands it the rows. What changes is where they come from, never what is made of them.
 *
 * A FILE IN THE FOLDER IS NOT AN INITIATIVE. The scan this replaces took every document under
 * `pages/initiative/`, so `pages/initiative/formula-name-translations.md` — a note, carrying no
 * page type in its name and no frontmatter at all — was drawn as a root initiative. A query answers
 * the pages of a page type, and the name settles the page type, so it is not among them.
 */

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

/**
 * Every initiative in akasha.
 *
 * AKASHA ONLY, because that is where initiatives stand and where the tree's paths are taken
 * relative to. A row answered against any other checkout carries a path this tree cannot open.
 */
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
