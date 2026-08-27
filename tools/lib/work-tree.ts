
export interface InitiativeDoc {
  readonly slug: string
  readonly relPath: string
  readonly parent: string | null
  readonly persona: string | null
}

export interface Initiatives {
  readonly initiatives: readonly InitiativeDoc[]
}

export interface Node {
  readonly kind: "initiative"
  readonly key: string
  readonly label: string
  readonly relPath: string | null
  readonly detail: string | null
  readonly note: string | null
  readonly color: string | null
  readonly children: readonly Node[]
}

export interface Drawn {
  readonly byInitiative: ReadonlyMap<string, string>
}

const NOTHING_DRAWN: Drawn = { byInitiative: new Map() }

function byKey(a: Node, b: Node): number {
  return a.key.localeCompare(b.key, "en", { numeric: true })
}

function sorted(nodes: readonly Node[]): readonly Node[] {
  return [...nodes].sort(byKey)
}

function push<K, V>(into: Map<K, V[]>, key: K, value: V): void {
  const at = into.get(key)
  if (at === undefined) into.set(key, [value])
  else at.push(value)
}

function rootedness<T extends { readonly parent: string | null }>(
  docs: ReadonlyMap<string, T>,
): ReadonlyMap<string, string | null> {
  const settled = new Map<string, string | null>()
  for (const key of docs.keys()) {
    const declared = docs.get(key)!.parent
    if (declared === null || !docs.has(declared)) {
      settled.set(key, null)
      continue
    }
    const open = new Set<string>([key])
    let at: string | null = declared
    let cyclic = false
    while (at !== null && docs.has(at)) {
      if (open.has(at)) {
        cyclic = true
        break
      }
      open.add(at)
      at = docs.get(at)!.parent
    }
    settled.set(key, cyclic ? null : declared)
  }
  return settled
}

function rootNote(
  declared: string | null,
  effective: string | null,
  docs: ReadonlyMap<string, unknown>,
): string | null {
  if (declared === null || effective !== null) return null
  return docs.has(declared)
    ? `drawn as a root: its parent chain through ${declared} closes on itself`
    : `drawn as a root: it names parent ${declared}, which has no document`
}

function initiativeNode(
  doc: InitiativeDoc,
  parents: ReadonlyMap<string, string | null>,
  children: ReadonlyMap<string, readonly string[]>,
  initiatives: ReadonlyMap<string, InitiativeDoc>,
  drawn: Drawn,
): Node {
  return {
    kind: "initiative",
    key: doc.slug,
    label: doc.slug,
    relPath: doc.relPath,
    detail: doc.persona,
    note: rootNote(doc.parent, parents.get(doc.slug) ?? null, initiatives),
    color: drawn.byInitiative.get(doc.slug) ?? null,
    children: sorted(
      (children.get(doc.slug) ?? []).map((slug) =>
        initiativeNode(initiatives.get(slug)!, parents, children, initiatives, drawn),
      ),
    ),
  }
}

export function workTree(initiatives: Initiatives, drawn: Drawn = NOTHING_DRAWN): readonly Node[] {
  const bySlug = new Map(initiatives.initiatives.map((one) => [one.slug, one]))

  const initiativeParents = rootedness(bySlug)
  const initiativeChildren = new Map<string, string[]>()
  for (const [slug, parent] of initiativeParents) {
    if (parent !== null) push(initiativeChildren, parent, slug)
  }

  return sorted(
    initiatives.initiatives
      .filter((one) => initiativeParents.get(one.slug) === null)
      .map((one) => initiativeNode(one, initiativeParents, initiativeChildren, bySlug, drawn)),
  )
}

export function walk(nodes: readonly Node[]): readonly Node[] {
  return nodes.flatMap((one) => [one, ...walk(one.children)])
}

export function render(nodes: readonly Node[], depth = 0): readonly string[] {
  return nodes.flatMap((one) => {
    const detail = one.detail === null ? "" : `  — ${one.detail}`
    const note = one.note === null ? "" : `  [${one.note}]`
    return [`${"  ".repeat(depth)}${one.label}${detail}${note}`, ...render(one.children, depth + 1)]
  })
}
