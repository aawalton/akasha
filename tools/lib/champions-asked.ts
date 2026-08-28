
/**
 * The domain rows the championing tree is drawn from, asked of the pages rather than scanned off
 * disk.
 *
 * THE TRAVERSAL IS NOT REPEATED HERE. Who champions a domain, and which parent championing
 * descends, are answered by `championOf` and `championParentOf` over a `Documents` this builds —
 * the same two functions the scanning reader uses. What changes is where the frontmatter comes
 * from, never what is made of it.
 *
 * ONE EXPANDED QUERY. A domain is any page whose type reaches `domain` along `extends-slug`, and a
 * query that expands means that whole family, so the corpus is walked once and each page read once,
 * under the declaration of its own page type. The store answers every value tagged with the kind it
 * holds while a `Frontmatter`'s readers take plain ones, so the tags come off here, and a kind this
 * did not plan for is thrown rather than cast away.
 */

import { type DomainRow } from "./champions-tree.ts"
import { type Documents, DOMAIN_SLUG_KEY, championOf, championParentOf, slugsIn } from "./domain.ts"
import { type Frontmatter, listField, textField } from "../../page/frontmatter.ts"
import { type Value } from "../../pages-system/formula/formula.ts"
import { cycleAmong, familyOf } from "../../pages-system/query/expands.ts"
import { type Page, checkQuery, runQuery } from "../../pages-system/query/query.ts"
import { declarationsFor, extendingIn } from "../../pages-system/store/declared.ts"
import { pageAt, pagesFor } from "../../pages-system/store/store.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { addressOf, slugNamed } from "../../page/page-address.ts"
import { type Roots } from "../../page/page.ts"
import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { SEQUENCE_KEY } from "./sequence-manifest.ts"

const PERSONA_CHAMPION_KEY = "persona-champion-slug"

const DOMAIN_PARENT_KEY = "domain-parent-slug"

const KEYS: readonly string[] = [DOMAIN_SLUG_KEY, DOMAIN_PARENT_KEY, PERSONA_CHAMPION_KEY, SEQUENCE_KEY]

const ADDRESS = `${AKASHA}:`

/** The page type at the head of the family a domain stands in. */
const DOMAIN = "domain"

/**
 * What a page holds under one key, as a `Frontmatter`'s readers take it: a run of characters, a
 * list of them, or `null` where the page holds nothing.
 *
 * A KIND NOT PLANNED FOR IS THROWN RATHER THAN CAST. Every key asked for is declared `slug`,
 * `relation-slug`, `relation-address` or a list of those, all of which the store answers as text.
 * Another kind under one of them means the page type was redeclared, and reading it as text anyway
 * would hand the tree a value it would sort and match on without ever saying where it came from.
 */
function plainly(value: Value, key: string): string | readonly string[] | null {
  if (value.kind === "absent") return null
  if (value.kind === "text") return value.text
  if (value.kind === "list") {
    return value.items.map((item) => {
      if (item.kind !== "text") {
        throw new Error(`\`${key}\` holds a ${item.kind} among its items, and this reads lists of text`)
      }
      return item.text
    })
  }
  throw new Error(`\`${key}\` holds a ${value.kind}, and this reads text and lists of text`)
}

/** A page's values, standing as the frontmatter every reader of a domain page expects. */
function frontmatterOf(properties: Readonly<Record<string, Value>>): Frontmatter {
  const fields = new Map<string, unknown>()
  for (const key of KEYS) {
    const held = properties[key]
    if (held === undefined) continue
    const plain = plainly(held, key)
    if (plain !== null) fields.set(key, plain)
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
  const root = rootFor(roots, AKASHA)
  const repo = { repo: AKASHA, root }
  const extending = extendingIn(root)
  const family = familyOf(DOMAIN, extending)
  if ("ring" in family) throw new Error(cycleAmong(family.ring))
  const declaring = declarationsFor(root, family.family)
  const head = declaring.get(DOMAIN)
  if (head === undefined) throw new Error(`no page type \`${DOMAIN}\` stands under ${root}`)
  const checked = checkQuery(
    { pageType: DOMAIN, expands: true, keys: [...KEYS] },
    head,
    extending,
    declaring
  )
  if (!checked.ok) throw new Error(checked.message)
  const byType = pagesFor(repo, checked.pageTypes)
  const now = Date.now()
  const pages: Page[] = []
  for (const kind of checked.pageTypes) {
    const declared = declaring.get(kind)
    if (declared === undefined) throw new Error(`no page type \`${kind}\` stands under ${root}`)
    for (const at of byType.get(kind) ?? []) {
      const page = pageAt(repo, at, declared, now)
      if ("unread" in page) continue
      pages.push(page)
    }
  }
  const found: [string, Frontmatter][] = []
  for (const page of runQuery(checked, pages)) {
    if (!page.at.startsWith(ADDRESS)) continue
    found.push([page.at.slice(ADDRESS.length), frontmatterOf(page.values.properties)])
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
