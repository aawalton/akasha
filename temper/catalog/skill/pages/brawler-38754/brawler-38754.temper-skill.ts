import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const brawler38754 = {
  id: "019e6f53-9f8a-74a7-9668-752a6f3445de",
  type: "page-type/temper-skill",
  slug: "brawler-38754",
  title: "Brawler",
  key: "brawler-38754",
  baseName: "Cleave",
  description:
    "Focus your strength into a mighty swing, dealing |cffffff6401|r Physical Damage to enemies in front of you.\n\nYou also gain a damage shield that absorbs |cffffff6381|r damage for |cffffff6|r seconds. Each enemy hit increases the damage shield's strength by |cffffff50|r%, up to |cffffff300|r%.",
  icon: "/esoui/art/icons/ability_2handed_002_b.dds",
  esoSkillId: 38754,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 14,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 163,
  createdAt: "2026-05-28T16:03:31.850Z",
  updatedAt: "2026-10-21T03:53:31.433Z",
  equations: [
    "<<1>> = 0.077464289 MaxStat + 0.81337504 MaxPower (Ultimate, Dmg, Physical, AOE, Direct, Melee)",
    "<<2>> = 0.0775051 MaxStat + 0.813513 MaxPower - 1.59094 (Ultimate, ratio = 10.50, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 50 (Constant)",
    "<<5>> = 300% (Constant)",
  ],
} as const satisfies TemperSkill
