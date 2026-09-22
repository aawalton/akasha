import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const futureFocus = {
  id: "019e6251-4cba-77ea-b33b-5023063b58c2",
  type: "page-type/temper-skill",
  slug: "future-focus",
  title: "Future Focus",
  key: "future-focus",
  baseName: "Future Focus",
  description: '"Grants you two additional Magicka Charges for use in Scrying."',
  icon: "/esoui/art/icons/ability_scrying_07c.dds",
  esoSkillId: 139781,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/world-scrying",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
