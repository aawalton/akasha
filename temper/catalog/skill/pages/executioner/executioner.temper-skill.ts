import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const executioner = {
  id: "019e6226-00ef-7896-a308-07d6cd532b94",
  type: "page-type/temper-skill",
  slug: "executioner",
  title: "Executioner",
  key: "executioner",
  baseName: "Reverse Slash",
  description:
    '"Spin around and strike an enemy down, dealing 1161 Bleed Damage. Deals up to 400% more damage to enemies with less than 50% Health."',
  icon: "/esoui/art/icons/ability_2handed_004_a.dds",
  esoSkillId: 39957,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
