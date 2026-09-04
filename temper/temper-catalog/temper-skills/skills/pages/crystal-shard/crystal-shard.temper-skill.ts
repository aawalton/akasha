import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crystalShard = {
  id: "019e6f53-a04a-7044-a482-9164ccd44a57",
  pageTypeSlug: "temper-skill",
  slug: "crystal-shard",
  title: "Crystal Shard",
  key: "crystal-shard",
  baseName: "Crystal Shard",
  description:
    '"Conjure dark crystals to bombard an enemy, dealing |cffffff8359|r Magic Damage. Your next non-Ultimate ability cast within |cffffff3|r seconds costs |cffffff10|r% less."',
  icon: "/esoui/art/icons/ability_sorcerer_thunderclap.dds",
  esoSkillId: 43714,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
