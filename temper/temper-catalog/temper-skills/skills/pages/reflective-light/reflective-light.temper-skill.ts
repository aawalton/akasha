import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const reflectiveLight = {
  id: "019e6245-a703-72e9-b956-06b717810a59",
  pageTypeSlug: "temper-skill",
  slug: "reflective-light",
  title: "Reflective Light",
  key: "reflective-light",
  baseName: "Sun Fire",
  description:
    '"Blast up to three enemies with a charge of radiant heat, dealing 1199 Flame Damage, an additional 3470 Flame Damage over 20 seconds, and reducing their Movement Speed by 40% for 3 seconds.\\n\\nUpon activation you gain Major Savagery and Major Prophecy for 20 seconds, increasing your Weapon and Spell Critical rating by 2629."',
  icon: "/esoui/art/icons/ability_templar_reflective_light.dds",
  esoSkillId: 24195,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
