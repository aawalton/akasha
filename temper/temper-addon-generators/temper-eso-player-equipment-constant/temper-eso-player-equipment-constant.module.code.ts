import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const CONSTANT_FAMILY_SCHEMA = z.union([
  z.literal("weapon-type"),
  z.literal("armor-type"),
  z.literal("quality"),
])

const EAV_SCHEMA = z
  .object({
    constantFamily: CONSTANT_FAMILY_SCHEMA,
    constantId: z.string().min(1),
    esoNum: z.number().int().nonnegative(),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedRow {
  constantFamily: "weapon-type" | "armor-type" | "quality"
  constantId: string
  esoNum: number
  displayOrder: number
}

function parseRow(row: Page): ParsedRow {
  const eav = EAV_SCHEMA.parse({
    constantFamily: row.constantFamily,
    constantId: row.constantId,
    esoNum: row.esoNum,
    displayOrder: row.displayOrder,
  })
  return {
    constantFamily: eav.constantFamily,
    constantId: eav.constantId,
    esoNum: eav.esoNum,
    displayOrder: eav.displayOrder,
  }
}

function renderFamilyRecord(
  constName: string,
  family: "weapon-type" | "armor-type" | "quality",
  rows: readonly ParsedRow[],
  templateTypeName: string,
  docLine: string
): string {
  const familyRows = rows.filter((r) => r.constantFamily === family)
  if (familyRows.length === 0) {
    throw new Error(`temper-eso-player-equipment-constant: family ${family} has no rows`)
  }
  const sorted = [...familyRows].sort((a, b) => a.displayOrder - b.displayOrder)
  const seenOrder = new Set<number>()
  for (const r of sorted) {
    if (seenOrder.has(r.displayOrder)) {
      throw new Error(
        `temper-eso-player-equipment-constant: duplicate displayOrder ${r.displayOrder} in family ${family} (constantId=${r.constantId})`
      )
    }
    seenOrder.add(r.displayOrder)
  }
  const seenIds = new Set<string>()
  for (const r of sorted) {
    if (seenIds.has(r.constantId)) {
      throw new Error(
        `temper-eso-player-equipment-constant: duplicate constantId ${r.constantId} in family ${family}`
      )
    }
    seenIds.add(r.constantId)
  }
  const entries = sorted.map((r) => `  ${JSON.stringify(r.constantId)}: ${r.esoNum},`)
  return `\
/** ${docLine} */
export const ${constName} = {
${entries.join("\n")}
} as const satisfies ${templateTypeName}
`
}

export function generateTemperEsoPlayerEquipmentConstant(rows: readonly Page[]): string {
  const parsed = rows.map(parseRow)

  const weaponBlock = renderFamilyRecord(
    "TEMPER_PLAYER_WEAPON_TYPE_TO_ESO",
    "weapon-type",
    parsed,
    "Record<WeaponTypeId, number>",
    "Player weapon type temper ID → ESO WEAPONTYPE_* number."
  )
  const armorBlock = renderFamilyRecord(
    "TEMPER_PLAYER_ARMOR_TYPE_TO_ESO",
    "armor-type",
    parsed,
    "Record<ArmorWeightId, number>",
    "Player armor weight temper ID → ESO ARMORTYPE_* number."
  )
  const qualityBlock = renderFamilyRecord(
    "TEMPER_PLAYER_QUALITY_TO_ESO",
    "quality",
    parsed,
    "Record<string, number>",
    "Player equipment quality temper ID → ESO ITEM_DISPLAY_QUALITY_* number (1-5)."
  )

  return `\
/**
 * Temper Player ESO Equipment Constants (Generated)
 *
 * Per-family forward maps from temper id (kebab-case) to the numeric ESO
 * WeaponType / ArmorType / DisplayQuality constant for player equipment,
 * sourced from the universal pages table (page type:
 * temper-eso-player-equipment-constant).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorWeightId } from "@temper/game-characters-equipment/armor/armor-weights-data"
import type { WeaponTypeId } from "@temper/game-characters-equipment/weapons/weapon-types-data"

${weaponBlock}
${armorBlock}
${qualityBlock}`
}
