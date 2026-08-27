import type { Page } from "../page.ts"
import { z } from "zod"

const SET_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
    subcategoryId: z.string().min(1),
    valid: z.array(z.string()),
    bonuses: z.array(z.unknown()),
    icons: z.record(z.string(), z.string()),
    esoSetId: z.number().int().nonnegative(),
    classId: z.string().min(1).optional(),
  })
  .strict()

interface ParsedSet {
  key: string
  name: string
  subcategoryId: string
  valid: readonly string[]
  bonuses: readonly unknown[]
  icons: Record<string, string>
  esoSetId: number
  classId: string | undefined
}

function parseSet(row: Page): ParsedSet {
  if (row.title === null) {
    throw new Error(`temper-set row ${row.id} has null title`)
  }
  const eav = SET_EAV_SCHEMA.parse({
    key: row.key,
    subcategoryId: row.subcategoryId,
    valid: row.valid,
    bonuses: row.bonuses,
    icons: row.icons,
    esoSetId: row.esoSetId,
    classId: row.classId,
  })
  return {
    key: eav.key,
    name: row.title,
    subcategoryId: eav.subcategoryId,
    valid: eav.valid,
    bonuses: eav.bonuses,
    icons: eav.icons,
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

import { createDataFile, type DataFile } from "@shared/utils-narrow/create-data-file"
import type { SetsAllTemplate } from "../sets-all-data"
import type { SetCategoryId } from "../set-categories-data"

const SETS_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, SetsAllTemplate>

// Explicit \`DataFile<string, ...>\` annotation prevents the TS native
// compiler from serializing the full inferred per-key union once the
// snapshot grows past ~255 rows (TS7056: "inferred type ... exceeds the
// maximum length the compiler will serialize"). The widened key type is
// equivalent to the \`setsAll\` consumer's annotation in
// \`sets-all-data.ts\`.
export const setsFromPages: DataFile<string, SetsAllTemplate, SetCategoryId> =
  createDataFile<SetsAllTemplate>()(SETS_DATA)
`
}
