import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const martialTraining36009 = {
  id: "019e6f53-a459-7b5a-9263-e2a518ab2f23",
  type: "page-type/temper-skill",
  slug: "martial-training-36009",
  title: "Martial Training",
  key: "martial-training-36009",
  baseName: "Martial Training",
  description:
    '"Reduces the cost of your weapon abilities by |cffffff2|r%.\\n\\nReduces the effectiveness of snares applied to you by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_templar_002.dds",
  esoSkillId: 36009,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/racial-redguard-skills",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
