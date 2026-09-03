#!/usr/bin/env bun

import { sayAnswer } from "@akasha/command-system/answer-bytes"
import { readingIn, type Valued, valuesOfType } from "@akasha/indexes"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { slugAt, textAt, type Value } from "@akasha/pages-system/page-value"

const HELP = `bun tools/page-tree.ts — the index answers a page tree is composed from

Prints one JSON object on stdout and nothing else:

  { "types": [ row, … ], "properties": [ row, … ], "propertyTypes": [ row, … ] }

A row is \`{ "at", "values" }\`. Nothing here composes a tree: the three groups are handed
back and whoever asked assembles them, which keeps the assembling in one place rather
than in two runtimes.

READ FROM THE INDEX AND FROM NOWHERE ELSE. Every row comes out of \`.git/data/index\`,
which files each page's whole value under its page type — so this opens 14 files and
parses no page body, rather than walking a corpus and reading each document. There is
no second path: an index that is not there refuses, because a walk kept as a fallback
is a walk that runs, and its cost comes back where nobody is looking for it.

WHAT IS DRAWN. The 208 page types under \`page\`, each with the properties that page type
declares; then the property pages themselves, under the kind of property each one is.
A property carrying properties of its own — a record, an entry — holds those beneath it
in the second tree, which is the only place they can hang.

A PROPERTY IS NAMED BARE WHERE THAT IS UNAMBIGUOUS AND \`kind/slug\` WHERE IT IS NOT.
One slug here needs the longer form. A declaration reaches its property under either
name, because a slug doubled when the declaration was written is often single by now.

  --help  This.
`

const PROPERTY_ROOT = "page-property"

const PAGE_TYPE = "page-type"

const ON_TYPE = "page-type"

const ON_PROPERTY_TYPE = "page-property-type"

const NO_PARENT = null

const SUFFIX = "-property"

interface Row {
  readonly at: string
  readonly values: Readonly<Record<string, string | readonly string[] | null>>
}

interface Answers {
  readonly types: readonly Row[]
  readonly properties: readonly Row[]
  readonly propertyTypes: readonly Row[]
}

interface Declaration {
  readonly pagePropertySlug: string
  readonly required?: boolean
  readonly many?: boolean
  readonly max?: number | null
}

interface Held {
  readonly at: string
  readonly kind: string
  readonly slug: string
  readonly value: Value
}

function atOf(path: string): string {
  return `${AKASHA}:${path}`
}

function declarationsIn(value: Value): readonly Declaration[] {
  const held = value["properties"]
  if (!Array.isArray(held)) return []
  const found: Declaration[] = []
  for (const one of held) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const named = (one as Record<string, unknown>)["pagePropertySlug"]
    if (typeof named !== "string") continue
    found.push(one as unknown as Declaration)
  }
  return found
}

// WHICH PAGE TYPES ARE KINDS OF PROPERTY, walked down `extendsSlug` from `page-property` rather
// than read off a list here. `named-file-property` extends `file-property` rather than the root,
// so a list of the root's children would miss it, and a new kind added tomorrow would be missed
// the same way.
function propertyKindsIn(types: ReadonlyMap<string, Value>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const [slug, value] of types) {
    const walked = new Set<string>()
    let at: string | null = slug
    while (at !== null && !walked.has(at)) {
      if (at === PROPERTY_ROOT) {
        if (slug !== PROPERTY_ROOT) found.add(slug)
        break
      }
      walked.add(at)
      const above: Value | undefined = types.get(at)
      at = above === undefined ? null : slugAt(above, "extendsSlug")
    }
  }
  return found
}

// A PROPERTY'S NAME AS THIS TREE WRITES IT, bare where one page carries the slug and `kind/slug`
// where two do, so the tree shows the shorter name wherever the shorter name is unambiguous. This
// says how a property is named here and not which names reach it — `reachOver` says that.
function namingOver(held: readonly Held[]): (kind: string, slug: string) => string {
  const carried = new Map<string, number>()
  for (const one of held) carried.set(one.slug, (carried.get(one.slug) ?? 0) + 1)
  return (kind, slug) => ((carried.get(slug) ?? 0) > 1 ? `${kind}/${slug}` : slug)
}

// EITHER NAME REACHES A PROPERTY, the bare slug or `kind/slug`, which is the grammar `reaches`
// already holds every other relation value to. What broke here was keying what is accepted off
// how many pages carry the slug today: a declaration is written qualified while the slug is
// doubled, and a later landing that drops the double leaves that name written and still correct.
// So every landing that de-duplicated a property slug made each declaration naming it a refusal
// here, and the count grew with the cleanup rather than with any bad declaration. A qualified
// name that narrows to two pages is refused rather than resolved to one of them.
function reachOver(held: readonly Held[]): (named: string) => Held | undefined {
  const byBare = new Map<string, Held>()
  for (const one of held) if (!byBare.has(one.slug)) byBare.set(one.slug, one)
  const byQualified = new Map<string, Held[]>()
  for (const one of held) {
    const at = `${one.kind}/${one.slug}`
    byQualified.set(at, [...(byQualified.get(at) ?? []), one])
  }
  return (named) => {
    const found = byQualified.get(named)
    if (found !== undefined) return found.length === 1 ? found[0] : undefined
    return byBare.get(named)
  }
}

function baseOf(kind: string): string {
  return kind.endsWith(SUFFIX) ? kind.slice(0, -SUFFIX.length) : kind
}

// THE TYPE DRAWN BESIDE A PROPERTY rather than above it, as an expression over the kinds: the kind
// a property is, what it points at where it points at something, the bound where the declaration
// carries one, and `| none` where the declaration does not require it. The declaring page type
// holds `many`, `max` and `required`; the property page holds the rest. So this takes both, and a
// property declared twice under different bounds says so under each type that declares it.
function typeOf(one: Held, said: Declaration): string {
  const target = slugAt(one.value, "targetPageTypeSlug")
  const format = slugAt(one.value, "nameFormatSlug")
  const inner =
    target !== null
      ? `${baseOf(one.kind)}(${target})`
      : format !== null
        ? `${baseOf(one.kind)}(${format})`
        : baseOf(one.kind)
  const bound = said.max === undefined || said.max === null ? "" : `, max ${said.max}`
  const listed = said.many === true ? `list(${inner}${bound})` : inner
  return said.required === true ? listed : `${listed} | none`
}

function propertyRow(one: Held, said: Declaration, on: string, named: string): Row {
  return {
    at: one.at,
    values: {
      slug: named,
      key: textAt(one.value, "propertySlug") ?? one.slug,
      "defined-on-slug": on,
      type: typeOf(one, said),
    },
  }
}

export function answersFrom(
  pageTypes: readonly Valued[],
  properties: ReadonlyMap<string, readonly Valued[]>
): Answers {
  const byType = new Map(pageTypes.map((one) => [textAt(one.value, "slug") ?? "", one.value]))

  const held: Held[] = []
  for (const [kind, listed] of properties) {
    for (const one of listed) {
      const slug = textAt(one.value, "slug")
      if (slug === null) continue
      held.push({ at: atOf(one.path), kind, slug, value: one.value })
    }
  }
  const naming = namingOver(held)
  const reach = reachOver(held)

  const types: Row[] = []
  for (const one of pageTypes) {
    const slug = textAt(one.value, "slug")
    if (slug === null) continue
    types.push({
      at: atOf(one.path),
      values: { slug, "extends-slug": slugAt(one.value, "extendsSlug") ?? NO_PARENT },
    })
  }

  const drawn: Row[] = []
  const unresolved: string[] = []
  const gather = (value: Value, on: string): undefined => {
    for (const said of declarationsIn(value)) {
      const one = reach(said.pagePropertySlug)
      if (one === undefined) {
        unresolved.push(`${on} declares \`${said.pagePropertySlug}\`, which names no property page`)
        continue
      }
      drawn.push(propertyRow(one, said, on, naming(one.kind, one.slug)))
    }
    return undefined
  }

  for (const [slug, value] of byType) {
    if (slug !== "") gather(value, `${ON_TYPE}/${slug}`)
  }

  const propertyTypes: Row[] = []
  for (const one of held) {
    const named = naming(one.kind, one.slug)
    propertyTypes.push({
      at: one.at,
      values: {
        "type-slug": named,
        kind: one.kind,
        suffix: null,
        of: textAt(one.value, "definition"),
        value: null,
      },
    })
    gather(one.value, `${ON_PROPERTY_TYPE}/${named}`)
  }

  if (unresolved.length > 0) {
    throw new Error(
      `the index answered ${unresolved.length} declaration(s) naming no property page: ` +
        unresolved.sort().join("; ")
    )
  }

  // NO DOMAIN ROWS, because the group had no counterpart here. In the markdown corpus a domain page
  // slugged `page-property-type-<kind>` said where a kind's node opens a document; in akasha a kind
  // is a page type, so `types` already carries the path of the page defining it and the tree opens
  // a kind node from there. The group was answered empty for as long as it stood, and inventing a
  // domain slug to fill it would have put a page slug in this answer that no page carries.
  return { types, properties: drawn, propertyTypes }
}

export function pageAnswers(root: string = rootFor(resolveRoots(), AKASHA)): Answers {
  const reading = readingIn(root)
  const pageTypes = valuesOfType(reading, PAGE_TYPE)
  const byType = new Map<string, Value>()
  for (const one of pageTypes) {
    const slug = textAt(one.value, "slug")
    if (slug !== null) byType.set(slug, one.value)
  }
  const properties = new Map<string, readonly Valued[]>()
  for (const kind of [...propertyKindsIn(byType)].sort()) {
    properties.set(kind, valuesOfType(reading, kind))
  }
  return answersFrom(pageTypes, properties)
}

export function main(argv: readonly string[]): number {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  const unknown = argv.filter((arg) => arg.startsWith("-"))
  if (unknown.length > 0) {
    process.stderr.write(`error: this command takes no flags, and was given ${unknown.join(" ")}\n`)
    return 1
  }
  try {
    sayAnswer(`${JSON.stringify(pageAnswers())}\n`)
  } catch (err) {
    process.stderr.write(`error: ${err instanceof Error ? err.message : String(err)}\n`)
    return 3
  }
  return 0
}

if (import.meta.main) process.exitCode = main(process.argv.slice(2))
