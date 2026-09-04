import { SKILL_ESO_ID_TO_INDEX_00 } from "../character-capture-skill-index-00/character-capture-skill-index-00.module.code.ts"
import { SKILL_ESO_ID_TO_INDEX_01 } from "../character-capture-skill-index-01/character-capture-skill-index-01.module.code.ts"
import { SKILL_ESO_ID_TO_INDEX_02 } from "../character-capture-skill-index-02/character-capture-skill-index-02.module.code.ts"
import { SKILL_ESO_ID_TO_TEMPER_ID_00 } from "../character-capture-skill-name-00/character-capture-skill-name-00.module.code.ts"
import { SKILL_ESO_ID_TO_TEMPER_ID_01 } from "../character-capture-skill-name-01/character-capture-skill-name-01.module.code.ts"
import { SKILL_ESO_ID_TO_TEMPER_ID_02 } from "../character-capture-skill-name-02/character-capture-skill-name-02.module.code.ts"
import { SKILL_ESO_ID_TO_TEMPER_ID_03 } from "../character-capture-skill-name-03/character-capture-skill-name-03.module.code.ts"
import { SKILL_ESO_ID_TO_TEMPER_ID_04 } from "../character-capture-skill-name-04/character-capture-skill-name-04.module.code.ts"
import { SKILL_ESO_ID_TO_TEMPER_ID_05 } from "../character-capture-skill-name-05/character-capture-skill-name-05.module.code.ts"

export const SKILL_ESO_ID_TO_INDEX: Record<number, number> = {
  ...SKILL_ESO_ID_TO_INDEX_00,
  ...SKILL_ESO_ID_TO_INDEX_01,
  ...SKILL_ESO_ID_TO_INDEX_02,
}

export const SKILL_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  ...SKILL_ESO_ID_TO_TEMPER_ID_00,
  ...SKILL_ESO_ID_TO_TEMPER_ID_01,
  ...SKILL_ESO_ID_TO_TEMPER_ID_02,
  ...SKILL_ESO_ID_TO_TEMPER_ID_03,
  ...SKILL_ESO_ID_TO_TEMPER_ID_04,
  ...SKILL_ESO_ID_TO_TEMPER_ID_05,
}

export function getPlayerSkillIndex(esoSkillId: number): number {
  return SKILL_ESO_ID_TO_INDEX[esoSkillId] ?? 0
}
export function getPlayerSkillTemperId(esoSkillId: number): string {
  return SKILL_ESO_ID_TO_TEMPER_ID[esoSkillId] ?? "no-skill"
}
