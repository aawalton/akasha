import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPANION_ARMOR_SLOT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    equipType: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedCompanionArmorSlot {
  key: string
  name: string
  equipType: number
}

function parseCompanionArmorSlot(row: Page): ParsedCompanionArmorSlot {
  if (row.title === null) {
    throw new Error(`temper-companion-armor-slot row ${row.id} has null title`)
  }
  const eav = COMPANION_ARMOR_SLOT_EAV_SCHEMA.parse({
    key: row.key,
    equipType: row.equipType,
  })
  return {
    key: eav.key,
    name: row.title,
    equipType: eav.equipType,
  }
}

export function generateTemperCompanionArmorSlot(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionArmorSlot)

  const precedence: Record<string, number> = {
    head: 0,
    shoulders: 1,
    chest: 2,
    hands: 3,
    waist: 4,
    legs: 5,
    feet: 6,
  }
  const sorted = [...parsed].sort((a, b) => {
    const pa = precedence[a.key] ?? 1_000
    const pb = precedence[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const seenKeys = new Set<string>()
  for (const slot of sorted) {
    if (seenKeys.has(slot.key)) {
      throw new Error(`temper-companion-armor-slot: duplicate key ${slot.key}`)
    }
    seenKeys.add(slot.key)
  }

  const entries = sorted.map(
    (slot) =>
      `  ${JSON.stringify(slot.key)}: { id: ${JSON.stringify(slot.key)} as const, name: ${JSON.stringify(slot.name)}, equipType: ${slot.equipType} },`
  )

  return `\
/**
 * Temper Companion Armor Slots (Generated)
 *
 * The 7 body positions where companion armor can be equipped, sourced
 * from the universal pages table (page type:
 * temper-companion-armor-slot).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CompanionArmorSlotTemplate } from "@akasha/temper-companions-core/companion-armor-slots"

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`companionArmorSlots.ids\` so \`(typeof companionArmorSlots.ids)[number]\`
 * stays a literal-union typed for callers (codec v48/v49, schema,
 * optimizer, UI, inventory signature compiler, companion gear diff).
 */
export const TEMPER_COMPANION_ARMOR_SLOTS_BY_ID = {
${entries.join("\n")}
} as const satisfies Record<string, CompanionArmorSlotTemplate>
`
}
