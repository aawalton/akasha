import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  skillLineCategoriesSorted: readonly { readonly id: string; readonly name: string; readonly displayOrder: number }[]
}>("@temper/game-characters-skill-lines/skill-line-categories")

export const skillLineCategoriesSorted = held.skillLineCategoriesSorted
