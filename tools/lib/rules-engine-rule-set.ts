import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { existsSync, readFileSync } from "node:fs"
import { slugNamed } from "../../page/page-address.ts"
import { type PageType, pagesOf, placeDirOf, placeOf, PROPERTY_GLOBS, scanIn, reposOf } from "../../page/page-types.ts"
import { blockOf, stringAt } from "../../page/text/text.ts"
import { stemOf as slugOf } from "../../page/name/name"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import type { Roots } from "../../page/page"
import type { Field, FieldType, Normalizer, RuleSet } from "./rules-engine.ts"
import { parseVocabulary, valuesOf } from "./rules-normalizer.ts"

export const RULE_SET_AT = `${placeDirOf("rules-engine-rule-set")}/`

function ruleSetAt(roots: Roots, ruleSet: string): string {
  const at = `${RULE_SET_AT}${ruleSet}.md`
  if (existsSync(`${rootFor(roots, AKASHA)}/${at}`)) return at
  const named = scanIn(rootFor(roots, AKASHA), [`${RULE_SET_AT}**/*.md`], AKASHA).find(
    (one) => slugOf(one) === ruleSet
  )
  if (named !== undefined) return named
  throw new Error(`no rule set stands for \`${ruleSet}\``)
}


interface Read {
  readonly one: (key: string) => string | null
  readonly many: (key: string) => readonly string[]
}

function readAt(root: string, relPath: string): Read {
  const { fm, why } = blockOf(readFileSync(`${root}/${relPath}`, "utf8"))
  if (why !== null) throw new Error(`\`${relPath}\` — ${why}`)
  return {
    one: (key) => stringAt(fm, key),
    many: (key) => {
      const value = fm.fields.get(key)
      return Array.isArray(value) ? value.map(String) : []
    },
  }
}

function typeOf(stated: Read): FieldType {
  if (stated.one("normalized-by-slug") !== null) return "enum"
  if (stated.many("values").length > 0) return "enum"
  const declared = stated.one("type")
  if (declared === "number") return "number"
  if (declared === "calendar-date") return "date"
  return "text"
}

interface Claim {
  readonly root: string
  readonly at: string
}

function claimOf(roots: Roots, type: PageType | undefined, slug: string): Claim {
  const repo = type === undefined ? undefined : reposOf(type)[0]
  if (type === undefined || repo === undefined)
    throw new Error(`\`${slug}\` names no page type that claims a file, so its values cannot be read`)
  const root = roots[repo]
  if (root === undefined)
    throw new Error(`\`${slug}\` is filed into \`${repo}\`, which is not cloned here, so its values cannot be read`)
  const standing = pagesOf(root, type, repo)
  const only = standing[0]
  return { root, at: standing.length === 1 && only !== undefined ? only : placeOf(type.slug) }
}

function valuesFor(stated: Read, roots: Roots, types: readonly PageType[]): readonly string[] {
  const by = stated.one("normalized-by-slug")
  if (by === null) return stated.many("values")
  const claim = claimOf(
    roots,
    types.find((one) => one.slug === by),
    by
  )
  return valuesOf(parseVocabulary(readFileSync(`${claim.root}/${claim.at}`, "utf8")))
}

function definitionsOn(appliesTo: string, roots: Roots): readonly Read[] {
  const found: { readonly key: string; readonly stated: Read }[] = []
  for (const relPath of scanIn(rootFor(roots, AKASHA), PROPERTY_GLOBS, AKASHA)) {
    const stated = readAt(rootFor(roots, AKASHA), relPath)
    const held = stated.one("defined-on-slug")
    if (held === null || slugNamed(held) !== appliesTo) continue
    const key = stated.one("key")
    if (key === null) continue
    found.push({ key, stated })
  }
  if (found.length === 0)
    throw new Error(`no property definition states \`defined-on-slug: ${appliesTo}\`, so nothing says what its fields are`)
  return found.sort((one, two) => one.key.localeCompare(two.key)).map((one) => one.stated)
}

function fieldsOf(appliesTo: string, roots: Roots, types: readonly PageType[]): readonly Field[] {
  const fields: Field[] = []
  for (const stated of definitionsOn(appliesTo, roots)) {
    const key = stated.one("key")
    if (key === null) continue
    const filler = stated.one("unmatched-example")
    fields.push({
      name: key,
      type: typeOf(stated),
      values: valuesFor(stated, roots, types),
      ...(filler === null ? {} : { filler }),
    })
  }
  return fields
}

function normalizerOf(appliesTo: string, roots: Roots, types: readonly PageType[]): Normalizer | null {
  for (const stated of definitionsOn(appliesTo, roots)) {
    const subject = stated.one("normalized-from")
    const by = stated.one("normalized-by-slug")
    if (subject === null || by === null) continue
    const field = stated.one("key")
    if (field === null) continue
    return {
      field,
      subject,
      path: claimOf(
        roots,
        types.find((one) => one.slug === by),
        by
      ).at,
    }
  }
  return null
}

function kindOf(slug: string, ruleSet: string): string {
  return slug.startsWith(`${ruleSet}-`) ? slug.slice(ruleSet.length + 1) : ""
}

export function globsOf(ruleSet: string, roots: Roots): Readonly<Record<string, string>> {
  const types = registryOf(diskFileTree(roots))
  const relPath = ruleSetAt(roots, ruleSet)
  const slug = readAt(rootFor(roots, AKASHA), relPath).one("slug") ?? ruleSet
  const globs: Record<string, string> = {}
  for (const one of types) {
    if (readAt(rootFor(roots, AKASHA), one.relPath).one("extends-slug") !== slug) continue
    if (reposOf(one).length > 0) globs[kindOf(one.slug, ruleSet)] = placeOf(one.slug)
  }
  return globs
}

export function ruleSetOf(ruleSet: string, roots: Roots): Pick<RuleSet, "name" | "fields" | "path" | "normalizer"> {
  const types = registryOf(diskFileTree(roots))
  const relPath = ruleSetAt(roots, ruleSet)
  const stated = readAt(rootFor(roots, AKASHA), relPath)
  const appliesTo = stated.one("applies-to-slug")
  const pattern = stated.one("path-pattern")
  if (appliesTo === null) throw new Error(`\`${relPath}\` states no \`applies-to-slug\`, so nothing says what it decides`)
  if (pattern === null) throw new Error(`\`${relPath}\` states no \`path-pattern\`, so no rule's path can be read`)
  return {
    name: ruleSet,
    fields: fieldsOf(appliesTo, roots, types),
    path: new RegExp(pattern),
    normalizer: normalizerOf(appliesTo, roots, types),
  }
}

export function globFor(globs: Readonly<Record<string, string>>, kind: string, ruleSet: string): string {
  const at = globs[kind]
  if (at === undefined)
    throw new Error(`no \`${kind}\` page type extends \`${ruleSet}\`, so nothing says where its rules stand`)
  return at
}
