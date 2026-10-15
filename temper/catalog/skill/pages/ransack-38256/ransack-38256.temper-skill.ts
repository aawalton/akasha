import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ransack38256 = {
  id: "019e6f53-a59f-7364-bb5d-518da1935414",
  type: "page-type/temper-skill",
  slug: "ransack-38256",
  title: "Ransack",
  key: "ransack-38256",
  baseName: "Puncture",
  description:
    "Thrust your weapon with disciplined precision at an enemy, dealing |cffffff4170|r Physical Damage and taunting them to attack you for |cffffff15|r seconds.\n\nAlso inflicts Major Breach on the enemy, reducing their Physical and Spell Resistance by |cffffff5948|r for |cffffff15|r seconds.\n\nYou also gain Minor Protection, reducing your damage taken by |cffffff5|r% for |cffffff15|r seconds.",
  icon: "/esoui/art/icons/ability_1handed_002_a.dds",
  esoSkillId: 38256,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 975,
  createdAt: "2026-05-28T16:03:33.407Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = Major Breach (Constant)",
    "<<4>> = 5948 (Constant)",
    "<<5>> = 15 seconds (Constant)",
    "<<6>> = Minor Protection (Constant)",
    "<<7>> = 5% (Constant)",
    "<<8>> = 15 seconds (Constant)",
  ],
} as const satisfies TemperSkill
