import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  companionSkills: { readonly ids: readonly string[]; readonly data: Record<string, { readonly id: string; readonly abilityId: number; readonly name: string } | undefined>; readonly list: readonly { readonly id: string; readonly abilityId: number; readonly name: string }[] }
}>("@temper/game-companions-core/skills/companion-skills-data")

export const companionSkills = held.companionSkills
