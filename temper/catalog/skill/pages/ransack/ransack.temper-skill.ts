import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ransack = {
  id: "019e6226-0109-7df7-9d2a-40433a9def21",
  type: "page-type/temper-skill",
  slug: "ransack",
  title: "Ransack",
  key: "ransack",
  baseName: "Puncture",
  description:
    "Thrust your weapon with disciplined precision at an enemy, dealing 1199 Physical Damage and taunting them to attack you for 15 seconds.\n\nAlso inflicts Major Breach on the enemy, reducing their Physical and Spell Resistance by 5948 for 15 seconds.\n\nYou also gain Minor Protection, reducing your damage taken by 5% for 15 seconds.",
  icon: "/esoui/art/icons/ability_1handed_002_a.dds",
  esoSkillId: 41487,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 974,
  createdAt: "2026-05-26T02:38:38.345Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05335445 MaxStat + 0.560221725 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = Major Breach (Constant)",
    "<<4>> = 5948 (Constant)",
    "<<5>> = 15 seconds (Constant)",
    "<<6>> = Minor Protection (Constant)",
    "<<7>> = 5% (Constant)",
    "<<8>> = 15 seconds (Constant)",
  ],
} as const satisfies TemperSkill
