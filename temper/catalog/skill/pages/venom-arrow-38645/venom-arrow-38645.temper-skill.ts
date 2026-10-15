import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const venomArrow38645 = {
  id: "019e6f53-a9b9-7878-80dd-8190f376421f",
  type: "page-type/temper-skill",
  slug: "venom-arrow-38645",
  title: "Venom Arrow",
  key: "venom-arrow-38645",
  baseName: "Poison Arrow",
  description:
    "Shoot an arrow coated in Shadowscale poison at an enemy, dealing |cffffff4038|r Poison Damage and an additional |cffffff11420|r Poison Damage over |cffffff20|r seconds.\n\nIf the enemy hit is casting an ability they are interrupted, set Off Balance, and stunned for |cffffff3|r seconds.\n\nAfter casting you gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage for |cffffff20|r seconds.",
  icon: "/esoui/art/icons/ability_bow_002_a.dds",
  esoSkillId: 38645,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 1593,
  createdAt: "2026-05-28T16:03:34.457Z",
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
