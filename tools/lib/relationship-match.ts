export interface RelationshipMatchEntry {
  readonly id: string
  readonly aliases: readonly string[]
}

export interface RelationshipRowsQuery {
  readonly pageTypeSlug: string
  readonly select: readonly string[]
  readonly limit: number
}

export type GetPages = (
  sb: unknown,
  query: RelationshipRowsQuery
) => Promise<{ readonly rows: readonly Record<string, unknown>[] }>

const RELATIONSHIP_PAGE_TYPE_SLUG = "relationship"

const RELATIONSHIP_LOAD_LIMIT = 5000

export function normalizeTerm(value: string): string {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

export function parseAliases(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return []
  for (const entry of value) if (typeof entry !== "string") return []
  return value
}

export function relationshipEntries(
  rows: readonly Record<string, unknown>[]
): readonly RelationshipMatchEntry[] {
  const entries: RelationshipMatchEntry[] = []
  for (const row of rows) {
    if (typeof row.id !== "string") continue
    entries.push({ id: row.id, aliases: parseAliases(row.aliases) })
  }
  return entries
}

export function matchRelationships(input: {
  readonly title: unknown
  readonly relationships: readonly RelationshipMatchEntry[]
}): readonly string[] {
  if (typeof input.title !== "string") return []
  const titleNorm = normalizeTerm(input.title)
  if (titleNorm.length === 0) return []

  const termToIds = new Map<string, Set<string>>()
  for (const rel of input.relationships) {
    for (const raw of rel.aliases) {
      const term = normalizeTerm(raw)
      if (term.length === 0) continue
      const ids = termToIds.get(term) ?? new Set<string>()
      ids.add(rel.id)
      termToIds.set(term, ids)
    }
  }

  const matched = new Set<string>()
  for (const [term, ids] of termToIds) {
    if (ids.size !== 1) continue
    if (!titleNorm.includes(term)) continue
    for (const id of ids) matched.add(id)
  }
  return [...matched].sort()
}

export function mergeRelationships(
  stated: readonly string[],
  matched: readonly string[]
): readonly string[] {
  const out = [...stated]
  const seen = new Set(stated)
  for (const id of matched) {
    if (seen.has(id)) continue
    seen.add(id)
    out.push(id)
  }
  return out
}

export async function relationshipsForTitle(args: {
  readonly sb: unknown
  readonly title: string
  readonly stated: readonly string[]
  readonly getPages: GetPages
}): Promise<readonly string[]> {
  const result = await args.getPages(args.sb, {
    pageTypeSlug: RELATIONSHIP_PAGE_TYPE_SLUG,
    select: ["id", "aliases"],
    limit: RELATIONSHIP_LOAD_LIMIT,
  })
  const matched = matchRelationships({
    title: args.title,
    relationships: relationshipEntries(result.rows),
  })
  return mergeRelationships(args.stated, matched)
}
