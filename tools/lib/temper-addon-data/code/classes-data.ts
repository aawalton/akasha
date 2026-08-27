import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  classes: { readonly data: Record<string, { readonly id: string; readonly name: string; readonly icon: string; readonly esoClassId: number }>; readonly ids: readonly string[]; readonly list: readonly { readonly id: string; readonly name: string; readonly icon: string; readonly esoClassId: number }[] }
}>("@temper/game-characters-classes/classes-data")

export const classes = held.classes
