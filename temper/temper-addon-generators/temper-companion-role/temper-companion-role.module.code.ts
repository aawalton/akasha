import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"
import { rankOf } from "../rank-by-key/rank-by-key.module.code.ts"

const COMPANION_ROLE_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedCompanionRole {
  key: string
  name: string
}

function parseCompanionRole(row: Page): ParsedCompanionRole {
  if (row.title === null) {
    throw new Error(`temper-companion-role row ${row.id} has null title`)
  }
  const eav = COMPANION_ROLE_EAV_SCHEMA.parse({ key: row.key })
  return { key: eav.key, name: row.title }
}

const KEY_RANK: Record<string, number> = {
  "no-role": 0,
  dps: 1,
  tank: 2,
  healer: 3,
  support: 4,
  "dps-aoe": 5,
  "dps-execute": 6,
  "dps+healer": 7,
  "dps+support": 8,
  "dps+tank": 9,
  "healer+support": 10,
  "healer+tank": 11,
  "support+tank": 12,
  "dps+healer+support": 13,
  "dps+healer+tank": 14,
  "dps+support+tank": 15,
  "healer+support+tank": 16,
  "dps+healer+support+tank": 17,
}

export function generateTemperCompanionRole(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionRole)
  const sorted = [...parsed].sort((a, b) => {
    const rankDelta = rankOf(a.key, KEY_RANK) - rankOf(b.key, KEY_RANK)
    if (rankDelta !== 0) return rankDelta
    return a.key.localeCompare(b.key)
  })

  const entryLines = sorted.map((r) => {
    const keyLiteral = JSON.stringify(r.key)
    return `  ${keyLiteral}: { id: ${keyLiteral} as const, name: ${JSON.stringify(r.name)} },`
  })

  return `\
/**
 * Temper Companion Roles (Generated)
 *
 * All possible role IDs produced by the companion assignment optimizer —
 * base roles, DPS variants, multi-role combos, and the \`no-role\` sentinel —
 * sourced from the universal pages table (page type: temper-companion-role).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { CompanionRoleTemplate } from "@akasha/temper-companions-core/companion-roles"

const COMPANION_ROLE_DATA = {
${entryLines.join("\n")}
} satisfies Record<string, CompanionRoleTemplate>

export const companionRoles = createDataFile<CompanionRoleTemplate>()(COMPANION_ROLE_DATA)
`
}
