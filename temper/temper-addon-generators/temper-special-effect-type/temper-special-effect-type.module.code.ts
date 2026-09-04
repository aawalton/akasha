import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SPECIAL_EFFECT_TYPE_EAV_SCHEMA = z
  .object({
    key: z.string(),
  })
  .strict()

interface ParsedSpecialEffectType {
  key: string
  name: string
}

function parseSpecialEffectType(row: Page): ParsedSpecialEffectType {
  if (row.title === null) {
    throw new Error(`temper-special-effect-type row ${row.id} has null title`)
  }
  const eav = SPECIAL_EFFECT_TYPE_EAV_SCHEMA.parse({
    key: row.key,
  })
  return {
    key: eav.key,
    name: row.title,
  }
}

export function generateTemperSpecialEffectType(rows: readonly Page[]): string {
  const parsed = rows.map(parseSpecialEffectType)

  const precedence: Record<string, number> = {
    "block-all": 0,
    "reflect-all": 1,
    "heal-to-full": 2,
    "become-invisible": 3,
    "dodge-next-attack": 4,
    interrupt: 5,
    "ignore-resistance": 6,
    "pull-to-caster": 7,
    "create-corpse": 8,
    cleanse: 9,
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
 * Temper Special Effect Types (Generated)
 *
 * Ten special-effect kinds — block-all, reflect-all, heal-to-full,
 * become-invisible, dodge-next-attack, interrupt, ignore-resistance,
 * pull-to-caster, create-corpse, cleanse — sourced from the universal
 * pages table (page type: temper-special-effect-type).
 *
 * Each entry's \`id\` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * \`TEMPER_SPECIAL_EFFECT_TYPES["block-all"]\` is well-typed and feeds the
 * \`specialEffectTypes\` lookup in @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { SpecialEffectTypeTemplate } from "../special-effect-type-data"

export const TEMPER_SPECIAL_EFFECT_TYPES = {
${entries.join("\n")}
} as const satisfies Record<string, SpecialEffectTypeTemplate>
`
}
