import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shieldCharge = {
  id: "019e6f53-a6f5-77d7-9d15-330c120a4c80",
  type: "page-type/temper-skill",
  slug: "shield-charge",
  title: "Shield Charge",
  key: "shield-charge",
  baseName: "Shield Charge",
  description:
    '"Rush an enemy and ram them, dealing |cffffff4846|r Physical Damage and stunning them for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_1handed_003.dds",
  esoSkillId: 28719,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
