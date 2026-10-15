import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const whirlwind = {
  id: "019e6f53-a9ed-790d-a689-427d7fea4001",
  type: "page-type/temper-skill",
  slug: "whirlwind",
  title: "Whirlwind",
  key: "whirlwind",
  baseName: "Whirlwind",
  description:
    "Launch yourself into a lethal spin, dealing |cffffff6400|r Physical Damage to nearby enemies. Deals up to |cffffff33|r% more damage to enemies with less than |cffffff50|r% Health.",
  icon: "/esoui/art/icons/ability_dualwield_005.dds",
  esoSkillId: 28591,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 1618,
  createdAt: "2026-05-28T16:03:34.509Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.075 MaxStat + 0.7875 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 33 (Constant)",
    "<<3>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
