import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceMeteor = {
  id: "019e6f53-a93e-7ba8-9b67-b2b16a11006a",
  type: "page-type/temper-skill",
  slug: "vengeance-meteor",
  title: "Vengeance Meteor",
  key: "vengeance-meteor",
  baseName: "Vengeance Meteor",
  description:
    "Call a comet down from the constellations to blast an enemy, dealing |cffffff17640|r Flame Damage to up to 3 enemies in the area, knocking them down, and stunning them for |cffffff2|r seconds.",
  icon: "/esoui/art/icons/ability_mageguild_005.dds",
  esoSkillId: 246494,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-guild-mages-guild",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1508,
  createdAt: "2026-05-28T16:03:34.334Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 15750 Flame Damage (Constant)",
    "<<2>> = 6 (Constant)",
    "<<3>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
