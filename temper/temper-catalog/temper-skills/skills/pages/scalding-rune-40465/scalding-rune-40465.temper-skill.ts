import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const scaldingRune40465 = {
  id: "019e6f53-a6bb-78b6-a9c0-332fd77d17a2",
  pageTypeSlug: "temper-skill",
  slug: "scalding-rune-40465",
  title: "Scalding Rune",
  key: "scalding-rune-40465",
  baseName: "Fire Rune",
  description:
    '"Inscribe a rune of cosmic fire on the earth, which takes |cffffff2|r seconds to arm and lasts for |cffffff20|r seconds.\\n\\nWhen triggered, the rune blasts all enemies in the target area for |cffffff8533|r Flame Damage and an additional |cffffff9427|r Flame Damage over |cffffff22|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_001_b.dds",
  esoSkillId: 40465,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
