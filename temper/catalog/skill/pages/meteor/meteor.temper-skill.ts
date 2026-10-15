import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const meteor = {
  id: "019e6f53-a484-7ae6-8215-c4ce01e1d2be",
  type: "page-type/temper-skill",
  slug: "meteor",
  title: "Meteor",
  key: "meteor",
  baseName: "Meteor",
  description:
    "Call a comet down from the constellations to blast an enemy, dealing |cffffff14934|r Flame Damage to all enemies in the area, knocking them down, and stunning them for |cffffff2|r seconds.\n\nAfter impact, enemies in the target area take |cffffff4036|r Flame Damage every |cffffff1|r second for |cffffff11|r seconds.",
  icon: "/esoui/art/icons/ability_mageguild_005.dds",
  esoSkillId: 16536,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 826,
  createdAt: "2026-05-28T16:03:33.124Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.175 MaxStat + 1.8375 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = 0.0499489 MaxStat + 0.524968 MaxPower - 0.306011 (Ultimate, ratio = 10.51, Dmg, Flame, AOE, DOT, 1s tick, R2 = 0.999999)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
