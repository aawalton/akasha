import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const WEAPON_SLOT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedWeaponSlot {
  key: string
  name: string
  icon: string | null
  displayOrder: number
}

function parseWeaponSlot(row: Page): ParsedWeaponSlot {
  if (row.title === null) {
    throw new Error(`temper-weapon-slot row ${row.id} has null title`)
  }
  const icon = typeof row.icon === "string" && row.icon.length > 0 ? row.icon : null
  const eav = WEAPON_SLOT_EAV_SCHEMA.parse({
    key: row.key,
    displayOrder: row.displayOrder,
  })
  return {
    key: eav.key,
    name: row.title,
    icon,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperWeaponSlot(rows: readonly Page[]): string {
  const parsed = rows.map(parseWeaponSlot)

  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const seenOrder = new Set<number>()
  for (const slot of sorted) {
    if (seenOrder.has(slot.displayOrder)) {
      throw new Error(
        `temper-weapon-slot: duplicate displayOrder ${slot.displayOrder} (key=${slot.key})`
      )
    }
    seenOrder.add(slot.displayOrder)
  }

  const entries = sorted.map((slot) => {
    const iconField = slot.icon === null ? "" : `, icon: ${JSON.stringify(slot.icon)}`
    return `  ${JSON.stringify(slot.key)}: { id: ${JSON.stringify(slot.key)} as const, name: ${JSON.stringify(slot.name)}${iconField} },`
  })

  return `\
/**
 * Temper Weapon Slots (Generated)
 *
 * The 3 weapon-equipment slot types (main-hand, off-hand, poison),
 * sourced from the universal pages table (page type: temper-weapon-slot).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { WeaponSlotTemplate } from "../weapon-slots-data"

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`weaponSlots.ids\` so \`(typeof weaponSlots.ids)[number]\` stays a
 * literal-union typed for callers (codec, schema, optimizer, UI).
 */
export const TEMPER_WEAPON_SLOTS_BY_ID = {
${entries.join("\n")}
} as const satisfies Record<string, WeaponSlotTemplate>
`
}
