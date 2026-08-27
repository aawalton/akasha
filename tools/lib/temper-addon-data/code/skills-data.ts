import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  skills: { readonly ids: readonly string[]; readonly data: Record<string, { readonly id: string; readonly esoSkillId: number; readonly name: string } | undefined>; readonly list: readonly { readonly id: string; readonly esoSkillId: number; readonly name: string }[] }
}>("@temper/game-characters-skills/skills-data")

export const skills = held.skills
