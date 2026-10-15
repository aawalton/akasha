import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const greaterStormAtronach = {
  id: "019e6245-a695-7bf6-a2be-d6e4eedb8f84",
  type: "page-type/temper-skill",
  slug: "greater-storm-atronach",
  title: "Greater Storm Atronach",
  key: "greater-storm-atronach",
  baseName: "Summon Storm Atronach",
  description:
    "Summon an immobile storm atronach at the target location. Its arrival deals 2249 Shock Damage and stuns enemies for 3 seconds. The atronach zaps the closest enemy, dealing 1509 Shock Damage every 1 second.\n\nAn ally near the atronach can activate the Charged Lightning synergy, granting nearby allies Major Berserk for 10 seconds, increasing their damage done by 10%.",
  icon: "/esoui/art/icons/ability_sorcerer_greater_storm_atronach.dds",
  esoSkillId: 30575,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 577,
  createdAt: "2026-05-26T03:13:12.341Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 0.067145 MaxStat + 0.7050225 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Shock, SingleTarget, DOT, 4s duration, 1s tick, 0.7s cooldown, R2 = 1)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = Charged Lightning (Constant)",
    "<<6>> = Major Berserk (Constant)",
    "<<7>> = 10 seconds (Constant)",
    "<<8>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
