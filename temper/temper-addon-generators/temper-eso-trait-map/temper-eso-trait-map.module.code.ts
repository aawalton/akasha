import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const TRAIT_FAMILY_SCHEMA = z.union([z.literal("weapon"), z.literal("armor"), z.literal("jewelry")])

const ESO_TRAIT_MAP_EAV_SCHEMA = z
  .object({
    traitFamily: TRAIT_FAMILY_SCHEMA,
    traitId: z.string().min(1),
    esoTraitNum: z.number().int().nonnegative(),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedEsoTraitMapRow {
  traitFamily: "weapon" | "armor" | "jewelry"
  traitId: string
  esoTraitNum: number
  displayOrder: number
}

function parseEsoTraitMapRow(row: Page): ParsedEsoTraitMapRow {
  const eav = ESO_TRAIT_MAP_EAV_SCHEMA.parse({
    traitFamily: row.traitFamily,
    traitId: row.traitId,
    esoTraitNum: row.esoTraitNum,
    displayOrder: row.displayOrder,
  })
  return {
    traitFamily: eav.traitFamily,
    traitId: eav.traitId,
    esoTraitNum: eav.esoTraitNum,
    displayOrder: eav.displayOrder,
  }
}

function renderFamilyRecord(
  constName: string,
  family: "weapon" | "armor" | "jewelry",
  rows: readonly ParsedEsoTraitMapRow[],
  templateTypeName: string
): string {
  const familyRows = rows.filter((r) => r.traitFamily === family)
  const sorted = [...familyRows].sort((a, b) => a.displayOrder - b.displayOrder)
  const seenOrder = new Set<number>()
  for (const r of sorted) {
    if (seenOrder.has(r.displayOrder)) {
      throw new Error(
        `temper-eso-trait-map: duplicate displayOrder ${r.displayOrder} in family ${family} (traitId=${r.traitId})`
      )
    }
    seenOrder.add(r.displayOrder)
  }
  const seenTraitIds = new Set<string>()
  for (const r of sorted) {
    if (seenTraitIds.has(r.traitId)) {
      throw new Error(`temper-eso-trait-map: duplicate traitId ${r.traitId} in family ${family}`)
    }
    seenTraitIds.add(r.traitId)
  }
  const entries = sorted.map((r) => `  ${JSON.stringify(r.traitId)}: ${r.esoTraitNum},`)
  return `\
/** Player ${family} trait temper ID → ESO ITEM_TRAIT_TYPE_${family.toUpperCase()}_* number. */
export const ${constName} = {
${entries.join("\n")}
} as const satisfies ${templateTypeName}
`
}

export function generateTemperEsoTraitMap(rows: readonly Page[]): string {
  const parsed = rows.map(parseEsoTraitMapRow)

  const armorBlock = renderFamilyRecord(
    "TEMPER_PLAYER_ARMOR_TRAIT_TO_ESO",
    "armor",
    parsed,
    "Record<ArmorTraitId, number>"
  )
  const weaponBlock = renderFamilyRecord(
    "TEMPER_PLAYER_WEAPON_TRAIT_TO_ESO",
    "weapon",
    parsed,
    "Record<WeaponTraitId, number>"
  )
  const jewelryBlock = renderFamilyRecord(
    "TEMPER_PLAYER_JEWELRY_TRAIT_TO_ESO",
    "jewelry",
    parsed,
    "Record<JewelryTraitId, number>"
  )

  return `\
/**
 * Temper Player ESO Trait Map (Generated)
 *
 * Per-family forward maps from temper trait id (kebab-case) to the
 * numeric ESO ItemTraitType constant for player equipment, sourced
 * from the universal pages table (page type: temper-eso-trait-map).
 *
 * Reverse maps (ESO number → temper trait id) are reconstructed at
 * module load by the facade via the typed-ids \`invertViaIds\` helper.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorTraitId } from "../armor-traits-data"
import type { JewelryTraitId } from "../jewelry-traits-data"
import type { WeaponTraitId } from "../weapon-traits-data"

${weaponBlock}
${armorBlock}
${jewelryBlock}`
}
