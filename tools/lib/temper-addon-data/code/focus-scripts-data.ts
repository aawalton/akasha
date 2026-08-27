import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  focusScripts: { readonly ids: readonly string[]; readonly data: Record<string, { id: string; name: string; itemId: number }> }
}>("@temper/game-characters-skills/scribing/focus-scripts-data")

export const focusScripts = held.focusScripts
