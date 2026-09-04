import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const scaldingRune = {
  id: "019e6238-c307-786c-b54c-96f81591e694",
  pageTypeSlug: "temper-skill",
  slug: "scalding-rune",
  title: "Scalding Rune",
  key: "scalding-rune",
  baseName: "Fire Rune",
  description:
    '"Inscribe a rune of cosmic fire on the earth, which takes 2 seconds to arm and lasts for 20 seconds.\\n\\nWhen triggered, the rune blasts all enemies in the target area for 2323 Flame Damage and an additional 2871 Flame Damage over 22 seconds."',
  icon: "/esoui/art/icons/ability_mageguild_001_b.dds",
  esoSkillId: 42349,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
