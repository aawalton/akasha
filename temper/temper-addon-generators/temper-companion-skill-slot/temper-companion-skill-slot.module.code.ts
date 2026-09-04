import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPANION_SKILL_SLOT_EAV_SCHEMA = z
  .object({
    key: z.string().min(1),
  })
  .strict()

interface ParsedCompanionSkillSlot {
  key: string
  name: string
}

function parseCompanionSkillSlot(row: Page): ParsedCompanionSkillSlot {
  if (row.title === null) {
    throw new Error(`temper-companion-skill-slot row ${row.id} has null title`)
  }
  const eav = COMPANION_SKILL_SLOT_EAV_SCHEMA.parse({
    key: row.key,
  })
  return {
    key: eav.key,
    name: row.title,
  }
}

export function generateTemperCompanionSkillSlot(rows: readonly Page[]): string {
  const parsed = rows.map(parseCompanionSkillSlot)

  const precedence: Record<string, number> = {
    "active-1": 0,
    "active-2": 1,
    "active-3": 2,
    "active-4": 3,
    "active-5": 4,
    ultimate: 5,
  }
  const sorted = [...parsed].sort((a, b) => {
    const pa = precedence[a.key] ?? 1_000
    const pb = precedence[b.key] ?? 1_000
    if (pa !== pb) return pa - pb
    return a.key.localeCompare(b.key)
  })

  const entries = sorted.map(
    (s) =>
      `  ${JSON.stringify(s.key)}: { id: ${JSON.stringify(s.key)}, name: ${JSON.stringify(s.name)} },`
  )

  return `\
/**
 * Temper Companion Skill Slots (Generated)
 *
 * The 6 companion skill-bar slots -- active-1 .. active-5 plus the
 * single ultimate -- sourced from the universal pages table (page type:
 * temper-companion-skill-slot). Companions have one skill bar with 5
 * active skills and 1 ultimate; no bar swap.
 *
 * Each entry's \`id\` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * \`TEMPER_COMPANION_SKILL_SLOTS["active-1"]\` is well-typed and feeds
 * the \`companionSkillSlots\` lookup in @temper/game-companions-core.
 *
 * DO NOT EDIT -- regenerate with: ops temper addon-data generate
 */

import type { CompanionSkillSlotTemplate } from "@akasha/temper-companions-core/companion-skill-slots"

export const TEMPER_COMPANION_SKILL_SLOTS = {
${entries.join("\n")}
} as const satisfies Record<string, CompanionSkillSlotTemplate>
`
}
