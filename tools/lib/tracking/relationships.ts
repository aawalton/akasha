import { askComposed } from "../page-query-client.ts"
import { dataError, inputError } from "../exit.ts"

const RELATIONSHIP_SLUG = "relationship"

const MAX_RELATIONSHIPS = 1000

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function looksLikeUuid(token: string): boolean {
  return UUID_RE.test(token)
}

export interface RelationshipPage {
  readonly id: string
  readonly title: string | undefined
}

export function parseRelationshipTokens(occurrences: readonly string[]): readonly string[] {
  const tokens: string[] = []
  for (const occurrence of occurrences) {
    for (const part of occurrence.split(",")) {
      const trimmed = part.trim()
      if (trimmed !== "") tokens.push(trimmed)
    }
  }
  return tokens
}

export function mapTokensToRelationshipIds(
  tokens: readonly string[],
  pages: readonly RelationshipPage[]
): readonly string[] {
  const cleaned = tokens.map((one) => one.trim()).filter((one) => one !== "")
  if (cleaned.length === 0) return []

  const byTitle = new Map<string, string[]>()
  for (const page of pages) {
    if (page.title === undefined) continue
    const key = page.title.toLowerCase()
    const standing = byTitle.get(key)
    if (standing !== undefined) standing.push(page.id)
    else byTitle.set(key, [page.id])
  }

  const seen = new Set<string>()
  const found: string[] = []
  for (const token of cleaned) {
    let id: string
    if (looksLikeUuid(token)) {
      id = token.toLowerCase()
    } else {
      const matches = byTitle.get(token.toLowerCase())
      if (matches === undefined || matches.length === 0) {
        throw inputError(`no relationship matches "${token}" (by id or title)`)
      }
      if (matches.length > 1) {
        throw inputError(
          `"${token}" matches ${matches.length} relationships (${matches.join(", ")}) — pass the id instead`
        )
      }
      id = matches[0] ?? ""
    }
    if (!seen.has(id)) {
      seen.add(id)
      found.push(id)
    }
  }
  return found
}

async function loadRelationshipPages(): Promise<readonly RelationshipPage[]> {
  const out: RelationshipPage[] = []
  let offset = 0
  let total = Number.POSITIVE_INFINITY
  while (offset < total) {
    const asked = await askComposed({
      "page-type": RELATIONSHIP_SLUG,
      keys: ["id", "title"],
      limit: MAX_RELATIONSHIPS,
      offset,
    })
    if (!asked.ok) throw dataError(`reading relationships: ${asked.why}`)
    total = asked.n
    for (const row of asked.rows) {
      const id = row.values.id
      const title = row.values.title
      if (typeof id === "string") {
        out.push({ id, title: typeof title === "string" ? title : undefined })
      }
    }
    if (asked.rows.length < MAX_RELATIONSHIPS) break
    offset += MAX_RELATIONSHIPS
  }
  return out
}

export async function resolveRelationshipIds(
  _sb: unknown,
  tokens: readonly string[]
): Promise<readonly string[]> {
  const cleaned = tokens.map((one) => one.trim()).filter((one) => one !== "")
  if (cleaned.length === 0) return []
  const needsLookup = cleaned.some((one) => !looksLikeUuid(one))
  return mapTokensToRelationshipIds(cleaned, needsLookup ? await loadRelationshipPages() : [])
}
