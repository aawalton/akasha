import { z } from "zod"
import type { Json, Page } from "../addon-data-page/addon-data-page.module.code.ts"

const BONUS_EFFECT_SCHEMA = z.looseObject({})

const BONUS_SCHEMA = z.object({
  count: z.number().int().nonnegative(),
  status: z.string().min(1),
  description: z.string(),
  effects: z.array(BONUS_EFFECT_SCHEMA).optional(),
})

const ICON_SCHEMA = z.object({
  slot: z.string().min(1),
  icon: z.string().min(1),
})

const SET_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    subcategoryId: z.string().min(1),
    valid: z.array(z.string()),
    bonuses: z.array(BONUS_SCHEMA),
    icons: z.array(ICON_SCHEMA),
    esoSetId: z.number().int().nonnegative(),
    classId: z.string().min(1).optional(),
  })
  .strict()

interface ParsedBonus {
  count: number
  status: string
  effects: readonly Record<string, unknown>[]
  description: string
}

interface ParsedSet {
  key: string
  name: string
  subcategoryId: string
  valid: readonly string[]
  bonuses: readonly ParsedBonus[]
  icons: Record<string, string>
  esoSetId: number
  classId: string | undefined
}

function entriesOf(value: Json | undefined): Record<string, Json>[] {
  if (!Array.isArray(value)) return []
  return value as Record<string, Json>[]
}

function readEffect(effect: Record<string, unknown>): Record<string, unknown> {
  const read: Record<string, unknown> = {}
  for (const [field, value] of Object.entries(effect)) {
    if (field === "id") continue
    if (field === "type") {
      read.effectType = value
      continue
    }
    if (field === "value") {
      read.effectValue = value
      continue
    }
    read[field] = value
  }
  return read
}

function parseSet(row: Page): ParsedSet {
  if (row.title === null) {
    throw new Error(`temper-set row ${row.id} has null title`)
  }
  const eav = SET_EAV_SCHEMA.parse({
    key: row.key,
    subcategoryId: row.subcategoryId,
    valid: row.valid,
    bonuses: entriesOf(row.bonuses).map((bonus) => ({
      count: bonus.count,
      status: bonus.status,
      description: bonus.description,
      effects: bonus.effects,
    })),
    icons: entriesOf(row.icons).map((entry) => ({
      slot: entry.slot,
      icon: entry.icon,
    })),
    esoSetId: row.esoSetId,
    classId: row.classId,
  })
  const icons: Record<string, string> = {}
  for (const entry of eav.icons) {
    icons[entry.slot] = entry.icon
  }
  return {
    key: eav.key,
    name: row.title,
    subcategoryId: eav.subcategoryId,
    valid: eav.valid,
    bonuses: eav.bonuses.map((bonus) => ({
      count: bonus.count,
      status: bonus.status,
      effects: (bonus.effects ?? []).map(readEffect),
      description: bonus.description,
    })),
    icons,
    esoSetId: eav.esoSetId,
    classId: eav.classId,
  }
}

export function generateTemperSet(rows: readonly Page[]): string {
  const parsed = rows.map(parseSet)

  const sorted = [...parsed].sort((a, b) =>
    a.key === "no-set" ? -1 : b.key === "no-set" ? 1 : a.key.localeCompare(b.key)
  )

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    const fields: string[] = []
    fields.push(`    id: ${keyLiteral} as const`)
    fields.push(`    name: ${JSON.stringify(r.name)}`)
    fields.push(`    esoSetId: ${r.esoSetId}`)
    fields.push(`    subcategoryId: ${JSON.stringify(r.subcategoryId)} as const`)
    fields.push(`    valid: ${JSON.stringify(r.valid)} as const`)
    fields.push(`    bonuses: ${JSON.stringify(r.bonuses)} as const`)
    fields.push(`    icons: ${JSON.stringify(r.icons)} as const`)
    if (r.classId !== undefined) {
      fields.push(`    classId: ${JSON.stringify(r.classId)} as const`)
    }
    return `  ${keyLiteral}: {
${fields.join(",\n")},
  },`
  })

  return `\
/**
 * Temper Sets (Generated)
 *
 * All ESO equipment sets sourced from the universal pages table (page
 * type: temper-set). The no-set sentinel plus the migrated per-category
 * rows live here; the remaining in-source \`categories/*-data.ts\`
 * files (those not yet cut over by their sibling row-only child project
 * under parent #9967) continue to compose alongside this snapshot in
 * \`sets-all-data.ts\`.
 *
 * Codec invariant: \`no-set\` is sorted to index 0 by the generator so
 * \`setsAll.ids\` keeps the sentinel at the position the character
 * codec's \`getSetId(index)\` expects.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import type { SetCategoryId } from "@akasha/temper-equipment/set-category-ids"
import type { SetId } from "@akasha/temper-equipment/set-ids"
import type { SetTemplate } from "@akasha/temper-equipment/set-template"

const SETS_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, SetTemplate>

// The named \`SetId\` union keeps the TS native compiler from
// serializing the full inferred per-key union once the snapshot grows
// past ~255 rows (TS7056: "inferred type ... exceeds the maximum length
// the compiler will serialize"). An explicit annotation is what TS7056
// asks for, so widening this key back to \`string\` is not the repair;
// widening it is what typed every set id as a bare string.
export const setsFromPages: DataFile<SetId, SetTemplate, SetCategoryId> =
  createDataFile<SetTemplate>()(SETS_DATA)
`
}
