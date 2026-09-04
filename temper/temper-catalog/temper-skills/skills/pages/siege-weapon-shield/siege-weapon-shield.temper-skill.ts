import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const siegeWeaponShield = {
  id: "019e6251-4ce9-7436-b4b9-4905914e37de",
  pageTypeSlug: "temper-skill",
  slug: "siege-weapon-shield",
  title: "Siege Weapon Shield",
  key: "siege-weapon-shield",
  baseName: "Siege Shield",
  description:
    '"Create a protective sphere over your location that reduces damage taken from siege weapons by 50% for you and nearby allies.\\n\\nThe sphere also protects you and your allies\' siege weapons, reducing damage from enemy siege weapons by 75%."',
  icon: "/esoui/art/icons/ability_ava_004_b.dds",
  esoSkillId: 46661,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
