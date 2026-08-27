import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  morphableSkillsByLine: { readonly get: (key: string) => readonly { readonly baseName: string; readonly morph1Name: string; readonly morph2Name: string; readonly skillType: string; readonly lineRankNeeded: number }[] }
}>("@temper/game-characters-skills-morphs-core")

export const morphableSkillsByLine = held.morphableSkillsByLine
