import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const executioner = {
  id: "019e6226-00ef-7896-a308-07d6cd532b94",
  pageTypeSlug: "temper-skill",
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
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
