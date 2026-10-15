import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const venomArrow = {
  id: "019e6226-011d-7ec5-80f5-518c45102e32",
  type: "page-type/temper-skill",
  slug: "venom-arrow",
  title: "Venom Arrow",
  key: "venom-arrow",
  baseName: "Poison Arrow",
  description:
    "Shoot an arrow coated in Shadowscale poison at an enemy, dealing 1161 Poison Damage and an additional 3470 Poison Damage over 20 seconds.\n\nIf the enemy hit is casting an ability they are interrupted, set Off Balance, and stunned for 3 seconds.\n\nAfter casting you gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage for 20 seconds.",
  icon: "/esoui/art/icons/ability_bow_002_a.dds",
  esoSkillId: 40823,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 1592,
  createdAt: "2026-05-26T02:38:38.365Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Dmg, Poison, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0156088 MaxStat + 0.162726 MaxPower - 2.99952 (Ultimate, ratio = 10.43, Dmg, Poison, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999995)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 3 seconds (Constant)",
    "<<5>> = Major Brutality (Constant)",
    "<<6>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
