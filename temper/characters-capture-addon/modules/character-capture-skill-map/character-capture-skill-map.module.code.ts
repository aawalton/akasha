import { SKILL_ESO_ID_TO_INDEX_00 } from "akasha/temper/characters-capture-addon/modules/character-capture-skill-index-00/character-capture-skill-index-00.module.code.ts"
import { SKILL_ESO_ID_TO_INDEX_01 } from "akasha/temper/characters-capture-addon/modules/character-capture-skill-index-01/character-capture-skill-index-01.module.code.ts"
import { SKILL_ESO_ID_TO_INDEX_02 } from "akasha/temper/characters-capture-addon/modules/character-capture-skill-index-02/character-capture-skill-index-02.module.code.ts"

const SKILL_ESO_ID_TO_INDEX: Record<number, number> = {
  ...SKILL_ESO_ID_TO_INDEX_00,
  ...SKILL_ESO_ID_TO_INDEX_01,
  ...SKILL_ESO_ID_TO_INDEX_02,
}

export function getPlayerSkillIndex(esoSkillId: number): number {
  return SKILL_ESO_ID_TO_INDEX[esoSkillId] ?? 0
}
