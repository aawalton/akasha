import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const incapacitatingStrike36508 = {
  id: "019e6f53-a36c-7bea-95fa-431cf54c5563",
  type: "page-type/temper-skill",
  slug: "incapacitating-strike-36508",
  title: "Incapacitating Strike",
  key: "incapacitating-strike-36508",
  baseName: "Death Stroke",
  description:
    "Ravage an enemy with a swift strike, dealing |cffffff13350|r Disease Damage and causing them to take |cffffff20|r% more damage from your attacks for |cffffff8|r seconds.\n\nIf cast with |cffffff126|r or more Ultimate, you instead deal |cffffff14685|r Disease Damage, stun the enemy for |cffffff3|r seconds, and increase the duration of the damage taken effect to |cffffff12|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_007_a.dds",
  esoSkillId: 36508,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 678,
  createdAt: "2026-05-28T16:03:32.844Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.16528 MaxStat + 1.73544 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Disease, SingleTarget, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 120 (Constant)",
    "<<5>> = 0.181808 MaxStat + 1.90898 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Disease, SingleTarget, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<6>> = 3 seconds (Constant)",
    "<<7>> = 12 seconds (Constant)",
  ],
} as const satisfies TemperSkill
