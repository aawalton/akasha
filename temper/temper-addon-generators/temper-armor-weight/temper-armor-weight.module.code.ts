import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const ARMOR_WEIGHT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    baseValue: z.number().nonnegative(),
    skillLineId: z.string().min(1),
    isStandard: z.boolean(),
  })
  .strict()

interface ParsedArmorWeight {
  key: string
  name: string
  baseValue: number
  skillLineId: string
  isStandard: boolean
}

function parseArmorWeight(row: Page): ParsedArmorWeight {
  if (row.title === null) {
    throw new Error(`temper-armor-weight row ${row.id} has null title`)
  }
  const eav = ARMOR_WEIGHT_EAV_SCHEMA.parse({
    key: row.key,
    baseValue: row.baseValue,
    skillLineId: row.skillLineId,
    isStandard: row.isStandard,
  })
  return {
    key: eav.key,
    name: row.title,
    baseValue: eav.baseValue,
    skillLineId: eav.skillLineId,
    isStandard: eav.isStandard,
  }
}

function formatEntry(aw: ParsedArmorWeight): string {
  return `  ${JSON.stringify(aw.key)}: { id: ${JSON.stringify(aw.key)} as const, name: ${JSON.stringify(aw.name)}, baseValue: ${aw.baseValue}, skillLineId: ${JSON.stringify(aw.skillLineId)} as const, isStandard: ${aw.isStandard} },`
}

export function generateTemperArmorWeight(rows: readonly Page[]): string {
  const parsed = rows.map(parseArmorWeight)

  const sorted = [...parsed].sort((a, b) => a.key.localeCompare(b.key))

  const allEntries = sorted.map(formatEntry)
  const standardEntries = sorted.filter((aw) => aw.isStandard).map(formatEntry)

  return `\
/**
 * Temper Armor Weights (Generated)
 *
 * ESO armor weight classes — 4 body-armor weights (no-weight / light /
 * medium / heavy) plus Shield, sourced from the universal pages table
 * (page type: temper-armor-weight).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorWeightTemplate } from "../armor-weights-data"

/**
 * Keyed record. \`ArmorWeightId\` is declared in
 * \`@akasha/temper-equipment/armor-weight-ids\`, and \`armorWeights\` is
 * annotated against that union, so a key here the union does not name
 * is a type error rather than a silent widening.
 */
export const TEMPER_ARMOR_WEIGHTS_BY_ID = {
${allEntries.join("\n")}
} as const satisfies Record<string, ArmorWeightTemplate>

/**
 * Standard body-armor weights only (excludes shield). Emitted as a
 * separate object literal so callers preserve narrow literal-union ids
 * without needing a runtime filter cast.
 */
export const STANDARD_TEMPER_ARMOR_WEIGHTS_BY_ID = {
${standardEntries.join("\n")}
} as const satisfies Record<string, ArmorWeightTemplate>
`
}
