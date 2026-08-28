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

function frontmatterOf(values: Readonly<Record<string, unknown>>): Frontmatter {
  const fields = new Map<string, unknown>()
  for (const key of KEYS) {
    const held = values[key]
    if (held !== null && held !== undefined) fields.set(key, held)
  }
  return { present: true, fields, keys: [...fields.keys()], error: null, lineCount: 0 }
}

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
