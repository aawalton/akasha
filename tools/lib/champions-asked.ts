
/**
 * The domain rows the championing tree is drawn from, asked of the pages rather than scanned off
 * disk.
 *
 * THE TRAVERSAL IS NOT REPEATED HERE. Who champions a domain, and which parent championing
 * descends, are answered by `championOf` and `championParentOf` over a `Documents` this builds —
 * the same two functions the scanning reader uses. What changes is where the frontmatter comes
 * from, never what is made of it.
 *
 * ONE QUERY PER DOMAIN KIND. A domain is any page whose type reaches `domain` along `extends-slug`,
 * which is 45 page types rather than one, and a query names a single page type. Every one of them
 * is answered from the held deriver, so the whole set costs one derive and the joins happen here.
 */

import { answer } from "./page-query.ts"
import { type DomainRow } from "./champions-tree.ts"
import { type Documents, DOMAIN_SLUG_KEY, championOf, championParentOf, slugsIn } from "./domain.ts"
import { type Frontmatter, listField, textField } from "../../page/frontmatter.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { domainKinds } from "../../page/page-types.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { addressOf, slugNamed } from "../../page/page-address.ts"
import { type Roots } from "../../page/page.ts"
import { AKASHA } from "../../repo/roots/roots.ts"
import { SEQUENCE_KEY } from "./sequence-manifest.ts"

const PERSONA_CHAMPION_KEY = "persona-champion-slug"

const DOMAIN_PARENT_KEY = "domain-parent-slug"

const KEYS: readonly string[] = [DOMAIN_SLUG_KEY, DOMAIN_PARENT_KEY, PERSONA_CHAMPION_KEY, SEQUENCE_KEY]

const ADDRESS = `${AKASHA}:`

/** A query row's values, standing as the frontmatter every reader of a domain page expects. */
function frontmatterOf(values: Readonly<Record<string, unknown>>): Frontmatter {
  const fields = new Map<string, unknown>()
  for (const key of KEYS) {
    const held = values[key]
    if (held !== null && held !== undefined) fields.set(key, held)
  }
  return { present: true, fields, keys: [...fields.keys()], error: null, lineCount: 0 }
}

/**
 * Every domain page in akasha, by the path it stands at.
 *
 * AKASHA ONLY, because that is where domains stand and where the tree's paths are taken relative
 * to. A row answered against any other checkout carries a path this tree cannot open.
 *
 * IN PATH ORDER, WHICH SETTLES A TIE. Two pages of different types may carry one slug — `list` is a
 * command, a page type and a property type at once — and the tree keys a parent by the bare slug,
 * so which of them a child hangs under is settled by which came last. Asked type by type that
 * would be whatever order the page types happen to be listed in; sorted, it is the order a walk of
 * the files gives, which is what every reader of this tree has been shown.
 */
function frontmatterByPath(roots: Roots): ReadonlyMap<string, Frontmatter> {
  const found: [string, Frontmatter][] = []
  for (const kind of domainKinds(registryOf(diskFileTree(roots)))) {
    for (const row of answer(roots, { pageType: kind, keys: [...KEYS] })?.rows ?? []) {
      if (!row.at.startsWith(ADDRESS)) continue
      found.push([row.at.slice(ADDRESS.length), frontmatterOf(row.values)])
    }
  }
  return new Map(found.sort(([one], [two]) => (one < two ? -1 : one > two ? 1 : 0)))
}

export function askedDomainRows(roots: Roots): readonly DomainRow[] {
  const frontmatter = frontmatterByPath(roots)
  const { slugs } = slugsIn(frontmatter)
  const docs: Documents = {
    frontmatterOf: (at) => frontmatter.get(at) ?? null,
    domainAt: (slug) => slugs.get(slug) ?? slugs.get(slugNamed(slug)) ?? null,
  }
  const rows: DomainRow[] = []
  for (const [relPath, fm] of frontmatter) {
    const slug = textField(fm, DOMAIN_SLUG_KEY)
    if (slug === null) continue
    // The guard the scanning reader carries: a page keeps its slug unless another page of its own
    // type already holds it, a slug being unique within a type rather than across the corpus.
    const type = pageTypeOf(relPath)
    const named = type === null ? slugs.get(slug) : docs.domainAt(addressOf(type, slug))
    if (named !== relPath) continue
    const addressed = championParentOf(relPath, docs)
    rows.push({
      slug,
      relPath,
      persona: championOf(relPath, docs)?.persona ?? null,
      parent: addressed === null ? null : slugNamed(addressed),
      sequence: listField(fm, SEQUENCE_KEY)
        .filter((one) => one !== "")
        .map((one) => slugNamed(one)),
    })
  }
  return rows
}
