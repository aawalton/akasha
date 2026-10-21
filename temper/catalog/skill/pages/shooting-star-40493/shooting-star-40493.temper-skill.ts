import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shootingStar40493 = {
  id: "019e6f53-a709-7e78-a1f2-60e8084c3aab",
  type: "page-type/temper-skill",
  slug: "shooting-star-40493",
  title: "Shooting Star",
  key: "shooting-star-40493",
  baseName: "Meteor",
  description:
    "Call a comet down from the constellations to blast an enemy, dealing |cffffff14936|r Flame Damage to all enemies in the area, knocking them down, and stunning them for |cffffff2|r seconds.\n\nAfter impact, enemies in the target area take |cffffff4038|r Flame Damage every |cffffff1|r second for |cffffff11|r seconds.\n\nYou generate |cffffff10|r Ultimate for each enemy hit by the initial blast, up to 6 times.",
  icon: "/esoui/art/icons/ability_mageguild_005_a.dds",
  esoSkillId: 40493,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 2,
  rank: 10,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1176,
  createdAt: "2026-05-28T16:03:33.769Z",
  updatedAt: "2026-10-21T02:29:23.868Z",
  equations: [
    "<<1>> = 0.180775 MaxStat + 1.89814 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = 0.051612 MaxStat + 0.542543 MaxPower - 0.879855 (Ultimate, ratio = 10.51, Dmg, Flame, AOE, DOT, 1s tick, R2 = 1)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = 10 seconds (Constant, +2 seconds with everlasting-magic)",
    "<<6>> = 10 (Constant)",
  ],
} as const satisfies TemperSkill
