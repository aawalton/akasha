import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const focusedAim = {
  id: "019e6226-00f1-7f3d-91e2-9f2e24b43867",
  type: "page-type/temper-skill",
  slug: "focused-aim",
  title: "Focused Aim",
  key: "focused-aim",
  baseName: "Snipe",
  description:
    '"Plant a masterfully aimed arrow in an enemy\'s vital spot, dealing 2404 Physical Damage and applying the Sundered status effect."',
  icon: "/esoui/art/icons/ability_bow_001_b.dds",
  esoSkillId: 40907,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
