export interface PageTypeRow {
  readonly slug: string
  readonly relPath: string
  readonly extendsSlug: string | null
}

export interface PropertyRow {
  readonly slug: string
  readonly relPath: string
  readonly key: string
  readonly definedOn: string
  readonly type: string | null
}

export interface PropertyTypeRow {
  readonly typeSlug: string
  readonly relPath: string
  readonly kind: string
  readonly suffix: string | null
  readonly of: string | null
  readonly value: string | null
}

export interface PageTypeCandidate {
  readonly slug: string
  readonly relPath: string
  readonly kind: string | null
  readonly extendsSlug: string | null
}

export interface PageTypeRows {
  readonly pageTypes: readonly PageTypeRow[]
  readonly properties: readonly PropertyRow[]
  readonly propertyTypes: readonly PropertyTypeRow[]
  readonly kindAt: ReadonlyMap<string, string>
  readonly vocabularyAt: string | null
}

export interface PageNode {
  readonly id: string
  readonly label: string
  readonly relPath: string | null
  readonly detail: string | null
  readonly children: readonly PageNode[]
}

export interface PageTree {
  readonly roots: readonly PageNode[]
  readonly unreached: readonly string[]
}

const KIND_ORDER: readonly string[] = ["primitive", "composite", "record", "select", "constant"]

export const PAGE_TYPE_KIND = "page-type"

export const VOCABULARY_ID = "vocabulary"
export const VOCABULARY_LABEL = "page property types"

function byText(a: string, b: string): number {
  return a.localeCompare(b)
}

function detailOfType(row: PropertyTypeRow): string | null {
  if (row.kind === "constant" && row.of !== null && row.value !== null) return `${row.of} = ${row.value}`
  if (row.suffix !== null) return row.suffix
  return row.of
}

function propertiesNode(id: string, rows: readonly PropertyRow[]): PageNode | null {
  if (rows.length === 0) return null
  const children = [...rows]
    .sort((a, b) => byText(a.key, b.key) || byText(a.slug, b.slug))
    .map((row) => ({
      id: `${id}/${row.slug}`,
      label: row.key,
      relPath: row.relPath,
      detail: row.type,
      children: [],
    }))
  return { id, label: "properties", relPath: null, detail: null, children }
}

function kindsIn(typeRows: PageTypeRows): readonly string[] {
  const standing = [...new Set(typeRows.propertyTypes.map((row) => row.kind))]
  return [
    ...KIND_ORDER.filter((kind) => standing.includes(kind)),
    ...standing.filter((kind) => !KIND_ORDER.includes(kind)).sort(byText),
  ]
}

export function pageTypeKinds(candidates: readonly PageTypeCandidate[]): ReadonlySet<string> {
  const extendsOf = new Map<string, string | null>()
  for (const one of candidates) {
    if (one.kind === PAGE_TYPE_KIND) extendsOf.set(one.slug, one.extendsSlug)
  }
  const kinds = new Set<string>()
  for (const slug of extendsOf.keys()) {
    const walked = new Set<string>()
    let at: string | null = slug
    while (at !== null && !walked.has(at)) {
      if (at === PAGE_TYPE_KIND) {
        kinds.add(slug)
        break
      }
      walked.add(at)
      at = extendsOf.get(at) ?? null
    }
  }
  return kinds
}

export function pageTypeRows(candidates: readonly PageTypeCandidate[]): readonly PageTypeRow[] {
  const kinds = pageTypeKinds(candidates)
  return candidates
    .filter((one) => one.kind !== null && kinds.has(one.kind))
    .map((one) => ({ slug: one.slug, relPath: one.relPath, extendsSlug: one.extendsSlug }))
}

export function pageTree(typeRows: PageTypeRows): PageTree {
  const definedOn = new Map<string, PropertyRow[]>()
  for (const row of typeRows.properties) {
    definedOn.set(row.definedOn, [...(definedOn.get(row.definedOn) ?? []), row])
  }

  const types = new Map(typeRows.pageTypes.map((row) => [row.slug, row]))
  const children = new Map<string, string[]>()
  const rootSlugs: string[] = []
  for (const row of [...typeRows.pageTypes].sort((a, b) => byText(a.slug, b.slug))) {
    const parent = row.extendsSlug
    if (parent === null) {
      rootSlugs.push(row.slug)
      continue
    }
    if (parent === row.slug || !types.has(parent)) continue
    children.set(parent, [...(children.get(parent) ?? []), row.slug])
  }

  const seen = new Set<string>()
  const build = (slug: string): PageNode => {
    seen.add(slug)
    const row = types.get(slug) as PageTypeRow
    const props = propertiesNode(`type/${slug}/properties`, definedOn.get(slug) ?? [])
    const kids = (children.get(slug) ?? []).filter((one) => !seen.has(one)).map(build)
    return {
      id: `type/${slug}`,
      label: slug,
      relPath: row.relPath,
      detail: null,
      children: props === null ? kids : [props, ...kids],
    }
  }
  const typeRoots = rootSlugs.map(build)

  const vocabulary: PageNode = {
    id: VOCABULARY_ID,
    label: VOCABULARY_LABEL,
    relPath: typeRows.vocabularyAt,
    detail: null,
    children: kindsIn(typeRows).map((kind) => {
      const rows = typeRows.propertyTypes
        .filter((row) => row.kind === kind)
        .sort((a, b) => byText(a.typeSlug, b.typeSlug))
      return {
        id: `kind/${kind}`,
        label: kind,
        relPath: typeRows.kindAt.get(kind) ?? null,
        detail: null,
        children: rows.map((row) => {
          const props = propertiesNode(`ptype/${row.typeSlug}/properties`, definedOn.get(row.typeSlug) ?? [])
          return {
            id: `ptype/${row.typeSlug}`,
            label: row.typeSlug,
            relPath: row.relPath,
            detail: detailOfType(row),
            children: props === null ? [] : [props],
          }
        }),
      }
    }),
  }

  const drawn = new Set([...seen, ...typeRows.propertyTypes.map((row) => row.typeSlug)])
  const unreached = [
    ...new Set([
      ...typeRows.pageTypes.map((row) => row.slug).filter((slug) => !seen.has(slug)),
      ...[...definedOn.keys()].filter((slug) => !drawn.has(slug)),
    ]),
  ].sort(byText)

  return { roots: [...typeRoots, vocabulary], unreached }
}

export function countPages(nodes: readonly PageNode[]): number {
  let total = 0
  for (const node of nodes) total += (node.relPath === null ? 0 : 1) + countPages(node.children)
  return total
}

function lines(node: PageNode, depth: number, into: string[]): void {
  const detail = node.detail === null ? "" : `  ${node.detail}`
  into.push(`${"  ".repeat(depth)}${node.label}${detail}`)
  for (const child of node.children) lines(child, depth + 1, into)
}

export function treeLines(tree: PageTree): readonly string[] {
  const out: string[] = []
  for (const root of tree.roots) lines(root, 0, out)
  if (tree.unreached.length > 0) {
    out.push("", `${tree.unreached.length} slug(s) no root reaches: ${tree.unreached.join(", ")}`)
  }
  return out
}

export function treeRecord(tree: PageTree, root: string): Record<string, unknown> {
  return { repo: root, roots: tree.roots, unreached: tree.unreached }
}
