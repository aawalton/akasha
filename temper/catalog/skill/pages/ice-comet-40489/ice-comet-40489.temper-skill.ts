import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const iceComet40489 = {
  id: "019e6f53-a33e-7195-9f50-7165a92b25a7",
  type: "page-type/temper-skill",
  slug: "ice-comet-40489",
  title: "Ice Comet",
  key: "ice-comet-40489",
  baseName: "Meteor",
  description:
    "Call a comet down from the constellations to blast an enemy, dealing |cffffff16971|r Frost Damage to all enemies in the area, knocking them down, stunning them for |cffffff2|r seconds, and reducing their Movement Speed by |cffffff50|r% for |cffffff5|r seconds. \n\nAfter impact, enemies in the target area take |cffffff4589|r Frost Damage every |cffffff1|r second for |cffffff11|r seconds.",
  icon: "/esoui/art/icons/ability_mageguild_005_b.dds",
  esoSkillId: 40489,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 1,
  rank: 10,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 651,
  createdAt: "2026-05-28T16:03:32.798Z",
  updatedAt: "2026-10-21T03:53:31.433Z",
  equations: [
    "<<1>> = 0.20540383 MaxStat + 2.1567402 MaxPower (Ultimate, RankMod(1), Dmg, Frost, AOE, Direct, Melee)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = 0.068929 MaxStat + 0.722759 MaxPower - 0.908521 (Ultimate, ratio = 10.49, Dmg, Frost, AOE, DOT, 1s tick, R2 = 1)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = 10 seconds (Constant, +2 seconds with everlasting-magic)",
    "<<6>> = 50% (Constant)",
    "<<7>> = 2 seconds (Constant, +2 seconds with everlasting-magic)",
  ],
} as const satisfies TemperSkill
