import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  getRacialSkillLineIdForRace: (raceId: string) => null | string
}>("@temper/game-characters-skills/passive-queries")

export const getRacialSkillLineIdForRace = held.getRacialSkillLineIdForRace
