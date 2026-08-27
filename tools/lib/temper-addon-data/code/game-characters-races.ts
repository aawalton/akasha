import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  races: { readonly data: Record<string, { readonly id: string; readonly name: string; readonly altName: string; readonly esoRaceId: number }>; readonly ids: readonly string[]; readonly list: readonly { readonly id: string; readonly name: string; readonly altName: string; readonly esoRaceId: number }[] }
}>("@temper/game-characters-races")

export const races = held.races
