import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const trapBeast = {
  id: "019e6f53-a85c-70a0-b8b3-796afcc8cfaa",
  type: "page-type/temper-skill",
  slug: "trap-beast",
  title: "Trap Beast",
  key: "trap-beast",
  baseName: "Trap Beast",
  description:
    "Set a sharpened blade trap at your location, which takes |cffffff1.5|r seconds to arm and lasts for |cffffff20|r seconds. \n\nWhen triggered, the trap deals |cffffff4036|r Bleed Damage, an additional |cffffff11420|r Bleed Damage over |cffffff20|r seconds, and grants you Minor Force, increasing your Critical Damage by |cffffff10|r% for the duration.\n\nEnemies who activate the trap are immobilized for |cffffff2|r seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_004.dds",
  esoSkillId: 35750,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1362,
  createdAt: "2026-05-28T16:03:34.108Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 0.0499489 MaxStat + 0.524968 MaxPower - 0.306011 (Ultimate, ratio = 10.51, Dmg, Bleed, SingleTarget, Direct, Melee, R2 = 0.999999)",
    "<<3>> = 0.015 MaxStat + 0.1575 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Bleed, SingleTarget, DOT, 18s duration, 2s tick, R2 = 1)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 10% (Constant)",
    "<<6>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
