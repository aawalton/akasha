import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const volcanicRune = {
  id: "019e6238-c32d-7c6b-bf4b-ab94a448fd05",
  pageTypeSlug: "temper-skill",
  slug: "volcanic-rune",
  title: "Volcanic Rune",
  key: "volcanic-rune",
  baseName: "Fire Rune",
  description:
    '"Inscribe a rune of cosmic fire on the earth, which takes 2 seconds to arm and lasts for 20 seconds.\\n\\nWhen triggered, the rune blasts all enemies in the target area for 2323 Flame Damage, knocks them into the air, and stuns them for 3 seconds."',
  icon: "/esoui/art/icons/ability_mageguild_001_a.dds",
  esoSkillId: 42327,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
