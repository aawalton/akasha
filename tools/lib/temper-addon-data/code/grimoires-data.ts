import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  grimoires: { readonly ids: readonly string[]; readonly data: Record<string, { id: string; name: string; itemId: number }> }
}>("@temper/game-characters-skills/scribing/grimoires-data")

export const grimoires = held.grimoires
