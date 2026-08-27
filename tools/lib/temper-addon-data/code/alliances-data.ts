import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  alliances: { readonly data: Record<string, { readonly id: string; readonly name: string; readonly esoAllianceId: number }>; readonly ids: readonly string[]; readonly list: readonly { readonly id: string; readonly name: string; readonly esoAllianceId: number }[] }
}>("@temper/game-characters-character/alliances-data")

export const alliances = held.alliances
