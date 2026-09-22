import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceOffering = {
  id: "019e6f53-a94a-7115-b233-27df05cb0715",
  type: "page-type/temper-skill",
  slug: "vengeance-offering",
  title: "Vengeance Offering",
  key: "vengeance-offering",
  baseName: "Vengeance Offering",
  description:
    '"Pour out your lifesblood and channel the arcane, healing yourself or an ally in front of you for |cffffff16065|r Health."',
  icon: "/esoui/art/icons/ability_nightblade_011.dds",
  esoSkillId: 237711,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-nightblade-siphoning",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
