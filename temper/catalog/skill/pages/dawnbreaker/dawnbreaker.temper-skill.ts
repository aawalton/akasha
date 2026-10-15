import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dawnbreaker = {
  id: "019e6f53-a086-7ceb-8c5e-b47d1573ffe5",
  type: "page-type/temper-skill",
  slug: "dawnbreaker",
  title: "Dawnbreaker",
  key: "dawnbreaker",
  baseName: "Dawnbreaker",
  description:
    "Arm yourself with Meridia's sacred sword and dispense her retribution, dealing |cffffff10668|r Physical Damage to enemies in front of you and an additional |cffffff11424|r Physical Damage over |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_005.dds",
  esoSkillId: 35713,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 319,
  createdAt: "2026-05-28T16:03:32.102Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.125 MaxStat + 1.3125 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, AOE, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<2>> = 0.049949 MaxStat + 0.524967 MaxPower - 0.306011 (Ultimate, ratio = 10.51, Dmg, Physical, SingleTarget, DOT, 4s duration, 2s tick, R2 = 0.999999)",
    "<<3>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
