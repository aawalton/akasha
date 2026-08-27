import { slugNamed } from "../../../page/page-address.ts"
import { askNamed, numberOf, textOf } from "./code-bridge.ts"
import type { Asked, QueryRow } from "./tracking-types.ts"

const PERSONA_QUERY = "persona-all"
const POINTS_SOURCE_QUERY = "persona-points-source-all"

const SOURCE_KEYS = {
  kind: "pointsSourceKind",
  marker: "pointsSource",
  aggregate: "pointsSourceAggregate",
  "path-prefix": "pointsPathPrefix",
  "point-field": "pointsSourcePointField",
  "weight-field": "pointsSourceWeightField",
} as const

function everyRowIn(named: string, asked: Asked): readonly QueryRow[] {
  if (!asked.ok) throw new Error(`\`${named}\` went unread: ${asked.why}`)
  const { n, rows } = asked.answer
  if (rows.length !== n) {
    throw new Error(
      `\`${named}\` answered with ${rows.length} of ${n} page(s), so nothing it fails to ` +
        `name can be told from what it never showed`
    )
  }
  return rows
}

export async function personaRecipeRows(): Promise<
  readonly Readonly<Record<string, unknown>>[]
> {
  const [personas, sources] = await Promise.all([
    askNamed(PERSONA_QUERY),
    askNamed(POINTS_SOURCE_QUERY),
  ])
  const personaRows = everyRowIn(PERSONA_QUERY, personas)
  const sourceRows = everyRowIn(POINTS_SOURCE_QUERY, sources)

  const sourceByPersona = new Map<string, Record<string, unknown>>()
  for (const row of sourceRows) {
    const persona = slugNamed(textOf(row.values["domain-parent-slug"]) ?? null)
    if (persona === null) continue
    const held: Record<string, unknown> = {}
    for (const [fileKey, rowKey] of Object.entries(SOURCE_KEYS)) {
      const value = textOf(row.values[fileKey])
      if (value !== undefined) held[rowKey] = value
    }
    sourceByPersona.set(persona, held)
  }

  const out: Record<string, unknown>[] = []
  for (const row of personaRows) {
    const id = textOf(row.values.id)
    const slug = textOf(row.values.slug)
    if (id === undefined || slug === undefined) continue
    const greenDayPoints = numberOf(row.values["green-day-points"])
    const totalPoints = numberOf(row.values["total-points"])
    const valueSlug = textOf(row.values["value-slug"])
    out.push({
      id,
      slug,
      title: textOf(row.values.title) ?? slug,
      ...(valueSlug === undefined ? {} : { valueSlug }),
      ...(greenDayPoints === undefined ? {} : { greenDayPoints }),
      ...(totalPoints === undefined ? {} : { totalPoints }),
      ...(sourceByPersona.get(slug) ?? {}),
    })
  }
  return out
}
