import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const burningTalons20252 = {
  id: "019e6f53-9fa4-7c4b-bf88-824e2c4486b5",
  pageTypeSlug: "temper-skill",
  slug: "burning-talons-20252",
  title: "Burning Talons",
  key: "burning-talons-20252",
  baseName: "Dark Talons",
  description:
    '"Call forth talons from the ground, dealing |cffffff6611|r Flame Damage to enemies near you, an additional |cffffff5375|r Flame Damage over |cffffff5|r seconds, and immobilizing them for |cffffff4|r seconds. \\n\\nAn ally near the talons can activate the Ignite synergy, dealing |cffffff10328|r Flame Damage to all enemies held within them."',
  icon: "/esoui/art/icons/ability_dragonknight_010_b.dds",
  esoSkillId: 20252,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
