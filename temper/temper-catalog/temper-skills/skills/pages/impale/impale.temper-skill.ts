import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const impale = {
  id: "019e6245-a6af-73a6-850b-c8afe8fd77bd",
  pageTypeSlug: "temper-skill",
  slug: "impale",
  title: "Impale",
  key: "impale",
  baseName: "Assassin's Blade",
  description:
    '"Throw a magic blade with lethal precision to strike an enemy, dealing 1161 Magic Damage. Deals 330% more damage to enemies below 25% Health."',
  icon: "/esoui/art/icons/ability_nightblade_017_b.dds",
  esoSkillId: 35596,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
