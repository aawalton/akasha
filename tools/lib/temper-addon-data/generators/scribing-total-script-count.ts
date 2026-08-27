import { affixScripts } from "../code/affix-scripts-data.ts"
import { focusScripts } from "../code/focus-scripts-data.ts"
import { signatureScripts } from "../code/signature-scripts-data.ts"

export function generateScribingTotalScriptCount(): string {
  const total = focusScripts.ids.length + signatureScripts.ids.length + affixScripts.ids.length
  return `\
/**
 * Scribing Total Script Count (Generated)
 *
 * The universe of unique scribing scripts (focus + signature + affix).
 * Source: @temper/game-characters-skills/scribing/{focus,signature,affix}-scripts-data
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const TOTAL_SCRIPT_COUNT = ${total}
`
}
