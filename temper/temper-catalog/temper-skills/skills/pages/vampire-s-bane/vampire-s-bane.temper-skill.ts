import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vampireSBane = {
  id: "019e6f53-a8a1-7067-abcd-2fb4c471f908",
  pageTypeSlug: "temper-skill",
  slug: "vampire-s-bane",
  title: "Vampire's Bane",
  key: "vampire-s-bane",
  baseName: "Sun Fire",
  description:
    '"Blast an enemy with a charge of radiant heat, dealing |cffffff4038|r Flame Damage, and an additional |cffffff17685|r Flame Damage over |cffffff30|r seconds.\\n\\nUpon activation you gain Major Savagery and Major Prophecy for |cffffff30|r seconds, increasing your Weapon and Spell Critical rating by |cffffff2629|r."',
  icon: "/esoui/art/icons/ability_templar_vampire_bane.dds",
  esoSkillId: 21729,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
