import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const iceComet = {
  id: "019e6238-c2c8-7408-bf3e-838073ad3ad3",
  type: "page-type/temper-skill",
  slug: "ice-comet",
  title: "Ice Comet",
  key: "ice-comet",
  baseName: "Meteor",
  description:
    "Call a comet down from the constellations to blast an enemy, dealing 4620 Frost Damage to all enemies in the area, knocking them down, stunning them for 2 seconds, and reducing their Movement Speed by 50% for 5 seconds. \n\nAfter impact, enemies in the target area take 1319 Frost Damage every 1 second for 11 seconds.",
  icon: "/esoui/art/icons/ability_mageguild_005_b.dds",
  esoSkillId: 42478,
  isMorph: true,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 650,
  createdAt: "2026-05-26T02:59:07.592Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.205414116 MaxStat + 2.15685235 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = 0.0712422 MaxStat + 0.746341 MaxPower - 1.49562 (Ultimate, ratio = 10.48, Dmg, Frost, AOE, DOT, 1s tick, R2 = 1)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = 10 seconds (Constant)",
    "<<6>> = 50% (Constant)",
    "<<7>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
