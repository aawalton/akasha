import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const moltenWhip20805 = {
  id: "019e6f53-a496-719a-a14a-d4ef82e1a04b",
  type: "page-type/temper-skill",
  slug: "molten-whip-20805",
  title: "Molten Whip",
  key: "molten-whip-20805",
  baseName: "Lava Whip",
  description:
    "Lash an enemy with flame, dealing |cffffff8342|r Flame Damage.\n\nActivating a different Dragonknight ability while in combat grants a stack of Seething Fury up to 3 times, increasing the damage of your next Molten Whip by |cffffff33|r% and your damage done by |cffffff5|r%, or |cffffff2|r% against players, for |cffffff10|r seconds. The damage done only activates if you are a Dragonknight.",
  icon: "/esoui/art/icons/ability_dragonknight_001_b.dds",
  esoSkillId: 20805,
  isMorph: true,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/dragonknight-ardent-flame",
  skillType: "temper-skill-type/active",
  hashPlace: 835,
  createdAt: "2026-05-28T16:03:33.142Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Seething Fury (Constant)",
    "<<3>> = Molten Whip (Constant)",
    "<<4>> = 33% (Constant)",
    "<<5>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
