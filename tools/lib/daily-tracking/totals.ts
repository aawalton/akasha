import { z } from "zod"
import { decideTotalPointsWrite, patchPage, resolvePointsPrefixes, WRITER } from "./code-bridge.ts"
import { readNetBytesCumulative } from "./net-bytes-points.ts"
import { personaRecipeRows } from "./persona-recipe-rows.ts"

const PERSONA_PAGE_TYPE_SLUG = "persona"

const PersonaTotalsRowSchema = z
  .object({
    id: z.string(),
    slug: z.string(),
    title: z.string().optional(),
    pointsPathPrefix: z.string().optional(),
    pointsPathPrefixes: z.array(z.string()).optional(),
    totalPoints: z.number().optional(),
  })
  .passthrough()

export interface PersonaTotalsOutcome {
  readonly personaTitle: string
  readonly totalPoints: number
  readonly personaWritten: boolean
}

export interface WriteTotalsResult {
  readonly personas: readonly PersonaTotalsOutcome[]
}

export async function writeTotalPointsForPersonas(
  repoRoot: string,
  options: { readonly force?: boolean } = {}
): Promise<WriteTotalsResult> {
  const { force = false } = options
  const personaRows = await personaRecipeRows()

  const personas: PersonaTotalsOutcome[] = []

  for (const row of personaRows) {
    const persona = PersonaTotalsRowSchema.parse(row)
    const prefixes = resolvePointsPrefixes(persona)
    if (prefixes.length === 0) continue

    const totalPoints = await readNetBytesCumulative(repoRoot, prefixes)

    const personaWrite = decideTotalPointsWrite(persona.totalPoints, totalPoints, force)
    if (personaWrite !== null) {
      const landed = await patchPage(
        PERSONA_PAGE_TYPE_SLUG,
        persona.slug,
        { "total-points": personaWrite },
        WRITER
      )
      if (!landed.ok) {
        throw new Error(`the ${persona.slug} total went unwritten: ${landed.why}`)
      }
    }

    personas.push({
      personaTitle: persona.title ?? persona.id,
      totalPoints,
      personaWritten: personaWrite !== null,
    })
  }

  return { personas }
}
