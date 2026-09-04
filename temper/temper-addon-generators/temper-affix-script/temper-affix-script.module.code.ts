import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const AFFIX_SCRIPT_EAV_SCHEMA = z
  .object({
    key: z.string(),
    slotType: z.literal("affix-slot"),
    itemId: z.number().int().nonnegative(),
    uespId: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedAffixScript {
  key: string
  name: string
  icon: string
  slotType: "affix-slot"
  itemId: number
  uespId: number
}

function parseAffixScript(row: Page): ParsedAffixScript {
  if (row.title === null) {
    throw new Error(`temper-affix-script row ${row.id} has null title`)
  }
  const eav = AFFIX_SCRIPT_EAV_SCHEMA.parse({
    key: row.key,
    slotType: row.slotType,
    itemId: row.itemId,
    uespId: row.uespId,
  })
  const icon = typeof row.icon === "string" ? row.icon : ""
  return {
    key: eav.key,
    name: row.title,
    icon,
    slotType: eav.slotType,
    itemId: eav.itemId,
    uespId: eav.uespId,
  }
}

export function generateTemperAffixScript(rows: readonly Page[]): string {
  const parsed = rows.map(parseAffixScript)

  const sorted = [...parsed].sort((a, b) => a.uespId - b.uespId)

  const entries = sorted.map((s) => {
    return `  ${JSON.stringify(s.key)}: { id: ${JSON.stringify(s.key)}, name: ${JSON.stringify(s.name)}, icon: ${JSON.stringify(s.icon)}, slotType: ${JSON.stringify(s.slotType)}, itemId: ${s.itemId}, uespId: ${s.uespId} },`
  })

  return `\
/**
 * Temper Affix Scripts (Generated)
 *
 * ESO scribing affix scripts (tertiary slot — buff/debuff modifiers),
 * sourced from the universal pages table (page type: temper-affix-script).
 *
 * Each entry's \`id\` is the stable codec-facing identifier
 * (e.g. "off-balance") and the same string is used as the record key,
 * so \`TEMPER_AFFIX_SCRIPTS["off-balance"]\` is well-typed and feeds the
 * \`AffixScriptId\` union and the \`affixScripts.data\` lookup in
 * @temper/game-characters-skills/scribing.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { AffixScriptTemplate } from "../scribing/affix-scripts-data"

export const TEMPER_AFFIX_SCRIPTS = {
${entries.join("\n")}
} as const satisfies Record<string, AffixScriptTemplate>
`
}
