import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  affixScripts: { readonly ids: readonly string[]; readonly data: Record<string, { id: string; name: string; itemId: number }> }
}>("@temper/game-characters-skills/scribing/affix-scripts-data")

export const affixScripts = held.affixScripts
