import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const reverseSlice = {
  id: "019e6226-0110-776e-a7b6-3f7d84607c71",
  pageTypeSlug: "temper-skill",
  slug: "reverse-slice",
  title: "Reverse Slice",
  key: "reverse-slice",
  baseName: "Reverse Slash",
  description:
    '"Spin around and strike an enemy down, dealing 1199 Physical Damage to them and all nearby enemies. Deals up to 300% more damage to enemies with less than 50% Health."',
  icon: "/esoui/art/icons/ability_2handed_004_b.dds",
  esoSkillId: 39942,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
