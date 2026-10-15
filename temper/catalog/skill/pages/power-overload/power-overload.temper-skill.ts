import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const powerOverload = {
  id: "019e6245-a6ea-7800-90d4-06944da1fed9",
  type: "page-type/temper-skill",
  slug: "power-overload",
  title: "Power Overload",
  key: "power-overload",
  baseName: "Overload",
  description:
    "Charge your fists with the power of the storm, replacing your Light and Heavy Attacks with new, stronger abilities.\n\nLight Attacks become lightning bolts, dealing 2640 Shock Damage to an enemy up to 32 meters away.\n\nHeavy Attacks blast enemies in a 6 x 8 area for 2375 Shock Damage.\n\nAttacks deplete Ultimate until you run out, or the ability is toggled off.",
  icon: "/esoui/art/icons/ability_sorcerer_power_overload.dds",
  esoSkillId: 30366,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 913,
  createdAt: "2026-05-26T03:13:12.426Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.11737979 MaxStat + 1.23248263 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Shock, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 32 (Constant)",
    "<<3>> = 0.105641811 MaxStat + 1.1092354 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Shock, AOE, Direct, R2 = 1)",
    "<<4>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
