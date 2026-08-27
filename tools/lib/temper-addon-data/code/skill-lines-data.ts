import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  getSkillLineIdsForClass: (classId: string) => readonly string[]
  skillLines: { readonly data: Record<string, { readonly id: string; readonly name: string; readonly subcategoryId: string; readonly displayOrder: number; readonly esoSkillLineId: number; readonly maxRank: number } | { readonly id: string; readonly name: string; readonly subcategoryId: string; readonly class: string; readonly displayOrder: number; readonly esoSkillLineId: number; readonly maxRank: number }>; readonly ids: readonly string[]; readonly list: readonly ({ readonly id: string; readonly name: string; readonly subcategoryId: string; readonly displayOrder: number; readonly esoSkillLineId: number; readonly maxRank: number } | { readonly id: string; readonly name: string; readonly subcategoryId: string; readonly class: string; readonly displayOrder: number; readonly esoSkillLineId: number; readonly maxRank: number })[] }
}>("@temper/game-characters-skill-lines/skill-lines-data")

export const getSkillLineIdsForClass = held.getSkillLineIdsForClass
export const skillLines = held.skillLines
