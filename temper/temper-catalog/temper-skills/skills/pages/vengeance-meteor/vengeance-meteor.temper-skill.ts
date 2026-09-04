import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceMeteor = {
  id: "019e6f53-a93e-7ba8-9b67-b2b16a11006a",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-meteor",
  title: "Vengeance Meteor",
  key: "vengeance-meteor",
  baseName: "Vengeance Meteor",
  description:
    '"Call a comet down from the constellations to blast an enemy, dealing |cffffff17640|r Flame Damage to up to 3 enemies in the area, knocking them down, and stunning them for |cffffff2|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_005.dds",
  esoSkillId: 246494,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-mages-guild",
  skillType: "ultimate",
  subcategoryId: "vengeance-guild-mages-guild",
} as const satisfies TemperSkill
