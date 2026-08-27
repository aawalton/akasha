import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  setsAll: { readonly ids: readonly string[]; readonly data: Record<string, { readonly id: string; readonly esoSetId: number; readonly name: string; readonly subcategoryId: string } | undefined>; readonly list: readonly { readonly id: string; readonly esoSetId: number; readonly name: string; readonly subcategoryId: string }[] }
}>("@temper/game-characters-equipment/sets/sets-all-data")

export const setsAll = held.setsAll
