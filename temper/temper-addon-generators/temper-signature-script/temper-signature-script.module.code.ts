import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SIGNATURE_SCRIPT_EAV_SCHEMA = z
  .object({
    key: z.string(),
    slotType: z.literal("signature-slot"),
    itemId: z.number().int().nonnegative(),
    uespId: z.number().int().nonnegative(),
  })
  .strict()

interface ParsedSignatureScript {
  key: string
  name: string
  icon: string
  slotType: "signature-slot"
  itemId: number
  uespId: number
}

function parseSignatureScript(row: Page): ParsedSignatureScript {
  if (row.title === null) {
    throw new Error(`temper-signature-script row ${row.id} has null title`)
  }
  const eav = SIGNATURE_SCRIPT_EAV_SCHEMA.parse({
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

export function generateTemperSignatureScript(rows: readonly Page[]): string {
  const parsed = rows.map(parseSignatureScript)

  const sorted = [...parsed].sort((a, b) => a.uespId - b.uespId)

  const entries = sorted.map((s) => {
    return `  ${JSON.stringify(s.key)}: { id: ${JSON.stringify(s.key)}, name: ${JSON.stringify(s.name)}, icon: ${JSON.stringify(s.icon)}, slotType: ${JSON.stringify(s.slotType)}, itemId: ${s.itemId}, uespId: ${s.uespId} },`
  })

  return `\
/**
 * Temper Signature Scripts (Generated)
 *
 * ESO scribing signature scripts (secondary slot — additional mechanics
 * and effects), sourced from the universal pages table
 * (page type: temper-signature-script).
 *
 * Each entry's \`id\` is the stable codec-facing identifier
 * (e.g. "lingering-torment") and the same string is used as the record
 * key, so \`TEMPER_SIGNATURE_SCRIPTS["lingering-torment"]\` is well-typed
 * and feeds the \`SignatureScriptId\` union and the
 * \`signatureScripts.data\` lookup in @temper/game-characters-skills/scribing.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { SignatureScriptTemplate } from "../scribing/signature-scripts-data"

export const TEMPER_SIGNATURE_SCRIPTS = {
${entries.join("\n")}
} as const satisfies Record<string, SignatureScriptTemplate>
`
}
