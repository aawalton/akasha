import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rapidStrikes38857 = {
  id: "019e6f53-a5b0-7c2e-adc0-9925125fa61f",
  type: "page-type/temper-skill",
  slug: "rapid-strikes-38857",
  title: "Rapid Strikes",
  key: "rapid-strikes-38857",
  baseName: "Flurry",
  description:
    "Flood an enemy with steel, battering them with four consecutive attacks that each deal |cffffff2398|r Physical Damage.\n\nEach hit increases the damage of the subsequent hit by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_dualwield_002_b.dds",
  esoSkillId: 38857,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 984,
  createdAt: "2026-05-28T16:03:33.424Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0297 MaxStat + 0.31184 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, Melee, 0.8s duration, 0.266s tick, R2 = 1)",
    "<<2>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
