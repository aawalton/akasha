export const tool = {
  summary: "Print the page type tree and the property type vocabulary, composed from the files now",
  path: "page types",
} as const

import { readFileSync } from "node:fs"
import { slugNamed } from "../page/page-address.ts"
import { listDocuments } from "./lib/check.ts"
import { parseFrontmatter, textField } from "../page/frontmatter.ts"
import { pageTypeOf } from "../pages-system/page-type/page-type.ts"
import {
  type PageTypeRows,
  countPages,
  type PageTypeCandidate,
  pageTree,
  pageTypeRows,
  type PropertyRow,
  type PropertyTypeRow,
  treeLines,
  treeRecord,
} from "./lib/page-tree.ts"
import { diskFileTree } from "../page/file-tree.ts"
import { registryOf } from "../page/property/registry.ts"
import { type Roots } from "../page/page.ts"
import { AKASHA, isDirty, resolveRoots, rootFor } from "../repo/roots/roots.ts"

const HELP = `bun tools/pages.ts — print the page type tree and the property type vocabulary

TWO TREES, because there are two questions. The first is what kinds of page there are and what
each carries: every page type under the one it extends, rooted at \`page\`, with the properties
each defines hanging beneath it. The second is what kinds of value exist: the property type
vocabulary, grouped by kind, with a record type's own fields beneath it.

NO PAGE TYPE EVER EXPANDS INTO ITS PAGES. This draws the specification, never the data, so a
page type carries its subtypes and the properties defined on it and nothing else. The
vocabulary is not an exception: those documents hang under their kind, not under the page type
they are pages of.

A PROPERTY'S TYPE IS DRAWN BESIDE IT RATHER THAN ABOVE IT. \`type:\` holds an expression over
the vocabulary — \`text\`, \`select(slug)\`, \`list(relation-slug, max 30)\`, \`relation-slug | none\`
— and an expression naming two types and a bound has no one place in a tree. So it stands as
the row's detail, and the vocabulary it draws on is the second tree.

A PAGE TYPE IS ANYTHING SPECIFIED AS ONE, not only a document whose own page type is
\`page-type\`. A page type may itself be extended — \`rules-engine-rule-set\` is — and the pages of
such a type are page types in their own right, named for that type as its \`files:\` states.
So the population is every document whose own page type reaches \`page-type\` along
\`extends-slug:\`, at whatever depth, and the folder a document sits in decides nothing.

Only a page type declaring \`extends-slug: none\` is a root. One whose \`extends-slug:\` names no
page type is reported as unreached rather than drawn as a second root, because a type that
extends something is not a root and saying so would hide the fault. A property defined on a
slug that is neither a page type nor a property type is reported the same way.

Usage:
  ops page types
  ops page types --json
  ops page types --counts

Flags:
  --json    The two trees as one JSON object, for a caller rather than a reader. It carries the
            instructions root beside them, so a caller joins absolute paths against what this
            command resolved rather than against a second copy of where the repository sits.
            A node with no document of its own carries \`relPath: null\`.
  --counts  How many page types, properties and property types were drawn.
  --help    This.

Exit codes:
  0  printed
`

const PAGE_TYPE_KIND = "page-type"
const PROPERTY_KIND = "page-property-definition"
const PROPERTY_TYPE_KIND = "page-property-type"
const DOMAIN_KIND = "domain"
const NO_PARENT = "none"
const KIND_DOMAIN = "page-property-type-"

function reaching(roots: Roots): (kind: string | null, target: string) => boolean {
  const types = registryOf(diskFileTree(roots))
  const above = new Map(types.map((one): [string, string | null] => [one.slug, one.extends]))
  return (kind, target) => {
    const seen = new Set<string>()
    let at = kind
    while (at !== null && !seen.has(at)) {
      if (at === target) return true
      seen.add(at)
      at = above.get(at) ?? null
    }
    return false
  }
}

function readPageTypeRows(roots: Roots): PageTypeRows {
  const root = rootFor(roots, AKASHA)
  const reaches = reaching(roots)
  const candidates: PageTypeCandidate[] = []
  const properties: PropertyRow[] = []
  const propertyTypes: PropertyTypeRow[] = []
  const kindAt = new Map<string, string>()
  let vocabularyAt: string | null = null

  for (const relPath of listDocuments(root)) {
    if (isDirty(relPath)) continue
    let body: string
    try {
      body = readFileSync(`${root}/${relPath}`, "utf8")
    } catch {
      continue
    }
    const fm = parseFrontmatter(body)
    const slug = textField(fm, "slug")
    if (slug === null) continue
    const kind = pageTypeOf(relPath)

    if (kind === DOMAIN_KIND && slug.startsWith(KIND_DOMAIN)) {
      kindAt.set(slug.slice(KIND_DOMAIN.length), relPath)
      continue
    }
    if (reaches(kind, PAGE_TYPE_KIND)) {
      if (slug === PROPERTY_TYPE_KIND) vocabularyAt = relPath
      const named = textField(fm, "extends-slug")
      candidates.push({
        slug,
        relPath,
        kind,
        extendsSlug: named === null || named === NO_PARENT ? null : named,
      })
      continue
    }
    if (kind === PROPERTY_TYPE_KIND) {
      const typeSlug = textField(fm, "type-slug")
      const named = textField(fm, "kind")
      if (typeSlug === null || named === null) continue
      propertyTypes.push({
        typeSlug,
        relPath,
        kind: named,
        suffix: textField(fm, "suffix"),
        of: textField(fm, "of"),
        value: textField(fm, "value"),
      })
      continue
    }
    if (reaches(kind, PROPERTY_KIND)) {
      const key = textField(fm, "key")
      const on = textField(fm, "defined-on-slug")
      if (key === null || on === null) continue
      properties.push({ slug, relPath, key, definedOn: slugNamed(on), type: textField(fm, "type") })
    }
  }

  return { pageTypes: pageTypeRows(candidates), properties, propertyTypes, kindAt, vocabularyAt }
}

function main(): void {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return
  }
  const roots = resolveRoots()
  const typeRows = readPageTypeRows(roots)
  const tree = pageTree(typeRows)

  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(treeRecord(tree, rootFor(roots, AKASHA)), null, 2)}\n`)
    return
  }
  if (argv.includes("--counts")) {
    process.stdout.write(
      [
        `${typeRows.pageTypes.length} page type(s)`,
        `${typeRows.properties.length} property definition(s)`,
        `${typeRows.propertyTypes.length} property type(s)`,
        `${countPages(tree.roots)} row(s) with a document`,
        `${tree.unreached.length} slug(s) no root reaches`,
      ].join("\n") + "\n"
    )
    return
  }
  process.stdout.write(`${treeLines(tree).join("\n")}\n`)
}

main()
