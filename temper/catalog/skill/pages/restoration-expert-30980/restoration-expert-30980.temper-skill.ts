import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const restorationExpert30980 = {
  id: "019e6f53-a628-71de-a5a7-dbad4b8cc622",
  type: "page-type/temper-skill",
  slug: "restoration-expert-30980",
  title: "Restoration Expert",
  key: "restoration-expert-30980",
  baseName: "Restoration Expert",
  description: '"Increases your healing by |cffffff8|r% on allies under |cffffff30|r% Health."',
  icon: "/esoui/art/icons/ability_templar_016.dds",
  esoSkillId: 30980,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
