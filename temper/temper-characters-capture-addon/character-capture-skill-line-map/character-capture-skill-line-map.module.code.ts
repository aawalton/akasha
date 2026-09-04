import { MORPHABLE_SKILLS_DETAIL_PER_LINE_00 } from "../character-capture-morphable-00/character-capture-morphable-00.module.code.ts"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE_01 } from "../character-capture-morphable-01/character-capture-morphable-01.module.code.ts"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE_02 } from "../character-capture-morphable-02/character-capture-morphable-02.module.code.ts"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE_03 } from "../character-capture-morphable-03/character-capture-morphable-03.module.code.ts"
import { MORPHABLE_SKILLS_DETAIL_PER_LINE_04 } from "../character-capture-morphable-04/character-capture-morphable-04.module.code.ts"
import { SKILL_LINE_ESO_ID_TO_INDEX } from "../character-capture-skill-line-ranks/character-capture-skill-line-ranks.module.code.ts"

export const MORPHABLE_SKILLS_DETAIL_PER_LINE: Record<
  number,
  ReadonlyArray<{
    baseName: string
    morph1Name: string
    morph2Name: string
    skillType: "active" | "ultimate"
    lineRankNeeded: number
  }>
> = {
  ...MORPHABLE_SKILLS_DETAIL_PER_LINE_00,
  ...MORPHABLE_SKILLS_DETAIL_PER_LINE_01,
  ...MORPHABLE_SKILLS_DETAIL_PER_LINE_02,
  ...MORPHABLE_SKILLS_DETAIL_PER_LINE_03,
  ...MORPHABLE_SKILLS_DETAIL_PER_LINE_04,
}

export function getPlayerSkillLineIndex(esoSkillLineId: number): number {
  return SKILL_LINE_ESO_ID_TO_INDEX[esoSkillLineId] ?? 0
}
