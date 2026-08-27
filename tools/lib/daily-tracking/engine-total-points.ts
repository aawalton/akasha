import { decideTotalPointsWrite, getEsoDayStr, patchPage, WRITER } from "./code-bridge.ts"
import { readHealthPersonaTotals } from "./health-total-points.ts"
import { personaRecipeRows } from "./persona-recipe-rows.ts"
import { type PointsSourceRowFields, resolvePointsSourceWriter } from "./points-source-writer.ts"
import { computeEngineTotal, num, str, strings } from "./totals-cumulative.ts"

const PERSONA_PAGE_TYPE_SLUG = "persona"

const OWNED_AGGREGATES: readonly string[] = ["sum", "count", "weighted"]

export function ownsAggregate(aggregate: string | undefined): boolean {
  return OWNED_AGGREGATES.includes(aggregate ?? "")
}

export interface EngineTotalOutcome {
  readonly slug: string
  readonly totalPoints: number
  readonly personaWritten: boolean
  readonly population: string
}

export interface EngineTotalsResult {
  readonly personas: readonly EngineTotalOutcome[]
  readonly noFigure: readonly string[]
  readonly examined: number
}

export async function writeEngineTotalPoints(repoRoot: string): Promise<EngineTotalsResult> {
  const rows = await personaRecipeRows()

  const healthReadings = await readHealthPersonaTotals()
  const healthIds = new Set(healthReadings.map((r) => r.personaId))

  const todayStr = getEsoDayStr(new Date())
  const personas: EngineTotalOutcome[] = []
  const noFigure: string[] = []

  for (const row of rows) {
    const personaId = String(row.id)
    if (healthIds.has(personaId)) continue

    const title = str(row.title) ?? personaId
    const slug = str(row.slug) ?? title.toLowerCase()
    const fields: PointsSourceRowFields = {
      slug,
      title,
      pointsSourceKind: str(row.pointsSourceKind),
      pointsSourceAggregate: str(row.pointsSourceAggregate),
      pointsSource: str(row.pointsSource),
      pointsSourcePointField: str(row.pointsSourcePointField),
      pointsSourceWeightField: str(row.pointsSourceWeightField),
      pointsPathPrefix: str(row.pointsPathPrefix),
      pointsPathPrefixes: strings(row.pointsPathPrefixes),
    }
    const verdict = resolvePointsSourceWriter(fields)
    if (verdict.writer !== "engine") continue
    if (!ownsAggregate(fields.pointsSourceAggregate)) continue

    const computed = await computeEngineTotal(repoRoot, fields, slug, todayStr)
    if (computed.state !== "computed") {
      noFigure.push(slug)
      continue
    }

    const personaWrite = decideTotalPointsWrite(num(row.totalPoints), computed.points)
    if (personaWrite !== null) {
      const landed = await patchPage(
        PERSONA_PAGE_TYPE_SLUG,
        slug,
        { "total-points": personaWrite },
        WRITER
      )
      if (!landed.ok) throw new Error(`the ${slug} engine total went unwritten: ${landed.why}`)
    }
    personas.push({
      slug,
      totalPoints: computed.points,
      personaWritten: personaWrite !== null,
      population: computed.population,
    })
  }

  return { personas, noFigure, examined: rows.length }
}
