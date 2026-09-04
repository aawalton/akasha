import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const ALLIANCE_EAV_SCHEMA = z
  .object({
    temperId: z.string(),
    esoAllianceId: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedAlliance {
  temperId: string
  name: string
  esoAllianceId: number
}

function parseAlliance(row: Page): ParsedAlliance {
  if (row.title === null) {
    throw new Error(`temper-alliance row ${row.id} has null title`)
  }
  const eav = ALLIANCE_EAV_SCHEMA.parse({
    temperId: row.temperId,
    esoAllianceId: row.esoAllianceId,
  })
  return {
    temperId: eav.temperId,
    name: row.title,
    esoAllianceId: eav.esoAllianceId,
  }
}

export function generateTemperAlliance(allianceRows: readonly Page[]): string {
  const alliances = allianceRows.map(parseAlliance)

  const sorted = [...alliances].sort((a, b) => a.esoAllianceId - b.esoAllianceId)

  const recordEntries = sorted.map((a) => {
    return `  ${JSON.stringify(a.temperId)}: { id: ${JSON.stringify(a.temperId)}, name: ${JSON.stringify(a.name)}, esoAllianceId: ${a.esoAllianceId} },`
  })

  return `\
/**
 * Temper Alliances (Generated)
 *
 * ESO character alliances, sourced from the universal pages table
 * (page type: temper-alliance).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { Alliance } from "../alliances-data"

export const TEMPER_ALLIANCE_DATA = {
${recordEntries.join("\n")}
} as const satisfies Record<string, Alliance>
`
}
