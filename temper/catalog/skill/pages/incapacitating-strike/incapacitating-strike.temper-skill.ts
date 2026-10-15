import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const incapacitatingStrike = {
  id: "019e6245-a6b2-74c3-bf6c-43e9ea7edcda",
  type: "page-type/temper-skill",
  slug: "incapacitating-strike",
  title: "Incapacitating Strike",
  key: "incapacitating-strike",
  baseName: "Death Stroke",
  description:
    "Ravage an enemy with a swift strike, dealing 3840 Disease Damage and causing them to take 20% more damage from your attacks for 8 seconds.\n\nIf cast with 120 or more Ultimate, you instead deal 4223 Disease Damage, stun the enemy for 3 seconds, and increase the duration of the damage taken effect to 12 seconds.",
  icon: "/esoui/art/icons/ability_nightblade_007_a.dds",
  esoSkillId: 37532,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 677,
  createdAt: "2026-05-26T03:13:12.370Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.17073424 MaxStat + 1.79270952 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Disease, SingleTarget, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 120 (Constant)",
    "<<5>> = 0.187807664 MaxStat + 1.97197634 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Disease, SingleTarget, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<6>> = 3 seconds (Constant)",
    "<<7>> = 12 seconds (Constant)",
  ],
} as const satisfies TemperSkill
