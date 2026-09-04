import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const ARMOR_SLOT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    displayOrder: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedArmorSlot {
  key: string
  name: string
  icon: string
  displayOrder: number
}

function parseArmorSlot(row: Page): ParsedArmorSlot {
  if (row.title === null) {
    throw new Error(`temper-armor-slot row ${row.id} has null title`)
  }
  if (typeof row.icon !== "string" || row.icon.length === 0) {
    throw new Error(`temper-armor-slot row ${row.id} has missing or empty icon`)
  }
  const eav = ARMOR_SLOT_EAV_SCHEMA.parse({
    key: row.key,
    displayOrder: row.displayOrder,
  })
  return {
    key: eav.key,
    name: row.title,
    icon: row.icon,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperArmorSlot(rows: readonly Page[]): string {
  const parsed = rows.map(parseArmorSlot)

  const sorted = [...parsed].sort((a, b) => a.displayOrder - b.displayOrder)

  const seenOrder = new Set<number>()
  for (const slot of sorted) {
    if (seenOrder.has(slot.displayOrder)) {
      throw new Error(
        `temper-armor-slot: duplicate displayOrder ${slot.displayOrder} (key=${slot.key})`
      )
    }
    seenOrder.add(slot.displayOrder)
  }

  const entries = sorted.map(
    (slot) =>
      `  ${JSON.stringify(slot.key)}: { id: ${JSON.stringify(slot.key)} as const, name: ${JSON.stringify(slot.name)}, icon: ${JSON.stringify(slot.icon)} },`
  )

  return `\
/**
 * Temper Armor Slots (Generated)
 *
 * The 7 body positions where armor can be equipped, sourced from the
 * universal pages table (page type: temper-armor-slot).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorSlotTemplate } from "../armor-slots-data"

/**
 * Keyed record. The literal-id keys flow into \`createDataFile\`'s
 * \`armorSlots.ids\` so \`(typeof armorSlots.ids)[number]\` stays a
 * literal-union typed for callers (codec, schema, optimizer, UI).
 */
export const TEMPER_ARMOR_SLOTS_BY_ID = {
${entries.join("\n")}
} as const satisfies Record<string, ArmorSlotTemplate>
`
}
