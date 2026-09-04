import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shootingStar = {
  id: "019e6238-c30c-7d54-898e-759971b0943a",
  pageTypeSlug: "temper-skill",
  slug: "shooting-star",
  title: "Shooting Star",
  key: "shooting-star",
  baseName: "Meteor",
  description:
    '"Call a comet down from the constellations to blast an enemy, dealing 4067 Flame Damage to all enemies in the area, knocking them down, and stunning them for 2 seconds.\\n\\nAfter impact, enemies in the target area take 1161 Flame Damage every 1 second for 11 seconds.\\n\\nYou generate 10 Ultimate for each enemy hit by the initial blast, up to 6 times."',
  icon: "/esoui/art/icons/ability_mageguild_005_a.dds",
  esoSkillId: 42492,
  isMorph: true,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-mages-guild",
  skillType: "ultimate",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
