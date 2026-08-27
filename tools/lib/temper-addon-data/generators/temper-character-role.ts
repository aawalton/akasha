import type { Page } from "../page.ts"
import { z } from "zod"

const CHARACTER_ROLE_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedRole {
  key: string
  name: string
}

function parseRole(row: Page): ParsedRole {
  if (row.title === null) {
    throw new Error(`temper-character-role row ${row.id} has null title`)
  }
  const eav = CHARACTER_ROLE_EAV_SCHEMA.parse({ key: row.key })
  return { key: eav.key, name: row.title }
}

const KEY_RANK: Record<string, number> = {
  "no-role": 0,
  dps: 1,
  tank: 2,
  healer: 3,
  pvp: 4,
  solo: 5,
}

function rankOf(key: string): number {
  return KEY_RANK[key] ?? Number.MAX_SAFE_INTEGER
}

export function generateTemperCharacterRole(roleRows: readonly Page[]): string {
  const roles = roleRows.map(parseRole)
  const sorted = [...roles].sort((a, b) => {
    const rankDelta = rankOf(a.key) - rankOf(b.key)
    if (rankDelta !== 0) return rankDelta
    return a.key.localeCompare(b.key)
  })

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    return `  ${keyLiteral}: { id: ${keyLiteral} as const, name: ${JSON.stringify(r.name)} },`
  })

  return `\
/**
 * Temper Character Roles (Generated)
 *
 * ESO build roles (playstyles) sourced from the universal pages table
 * (page type: temper-character-role).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { RoleTemplate } from "../roles"

const ROLE_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, RoleTemplate>

export const roles = createDataFile<RoleTemplate>()(ROLE_DATA)
`
}
