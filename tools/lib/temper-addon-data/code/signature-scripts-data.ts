import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  signatureScripts: { readonly ids: readonly string[]; readonly data: Record<string, { id: string; name: string; itemId: number }> }
}>("@temper/game-characters-skills/scribing/signature-scripts-data")

export const signatureScripts = held.signatureScripts
