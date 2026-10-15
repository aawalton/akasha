import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const powerOverload24806 = {
  id: "019e6f53-a52b-707a-8d37-c1d0c18b3540",
  type: "page-type/temper-skill",
  slug: "power-overload-24806",
  title: "Power Overload",
  key: "power-overload-24806",
  baseName: "Overload",
  description:
    "Charge your fists with the power of the storm, replacing your Light and Heavy Attacks with new, stronger abilities.\n\nLight Attacks become lightning bolts, dealing |cffffff9177|r Shock Damage to an enemy up to |cffffff32|r meters away.\n\nHeavy Attacks blast enemies in a |cffffff6 x 8|r area for |cffffff8727|r Shock Damage.\n\nAttacks deplete Ultimate until you run out, or the ability is toggled off.",
  icon: "/esoui/art/icons/ability_sorcerer_power_overload.dds",
  esoSkillId: 24806,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 914,
  createdAt: "2026-05-28T16:03:33.291Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.11363 MaxStat + 1.19311 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Shock, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 32 (Constant)",
    "<<3>> = 0.102267 MaxStat + 1.0738 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Shock, AOE, Direct, R2 = 1)",
    "<<4>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
