import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const steelTornado38861 = {
  id: "019e6f53-a7ba-799e-a839-ee3e0ca046a0",
  type: "page-type/temper-skill",
  slug: "steel-tornado-38861",
  title: "Steel Tornado",
  key: "steel-tornado-38861",
  baseName: "Whirlwind",
  description:
    "Launch yourself into a lethal spin, releasing a flurry of blades around you that deals |cffffff6401|r Physical Damage to nearby enemies. Deals up to |cffffff33|r% more damage to enemies with less than |cffffff50|r% Health.",
  icon: "/esoui/art/icons/ability_dualwield_005_b.dds",
  esoSkillId: 38861,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 14,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 1272,
  createdAt: "2026-05-28T16:03:33.946Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077476 MaxStat + 0.81349 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 33 (Constant)",
    "<<3>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
