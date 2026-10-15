import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rapidStrikes = {
  id: "019e6226-010b-786a-b92d-3a91a8ea5ae5",
  type: "page-type/temper-skill",
  slug: "rapid-strikes",
  title: "Rapid Strikes",
  key: "rapid-strikes",
  baseName: "Flurry",
  description:
    "Flood an enemy with steel, battering them with four consecutive attacks that each deal 689 Physical Damage.\n\nEach hit increases the damage of the subsequent hit by 5%.",
  icon: "/esoui/art/icons/ability_dualwield_002_b.dds",
  esoSkillId: 40590,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 983,
  createdAt: "2026-05-26T02:38:38.347Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0306801 MaxStat + 0.32213072 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, Melee, 0.8s duration, 0.266s tick, R2 = 1)",
    "<<2>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
