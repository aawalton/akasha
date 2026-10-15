import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lightweightBeastTrap40372 = {
  id: "019e6f53-a404-7b1e-a182-eb17a9d7e22e",
  type: "page-type/temper-skill",
  slug: "lightweight-beast-trap-40372",
  title: "Lightweight Beast Trap",
  key: "lightweight-beast-trap-40372",
  baseName: "Trap Beast",
  description:
    "Launch a sharpened blade trap at a target location, which takes |cffffff1.5|r seconds to arm and lasts for |cffffff20|r seconds.\n\nWhen triggered, the trap deals |cffffff4038|r Bleed Damage, an additional |cffffff11420|r Bleed Damage over |cffffff20|r seconds, and grants you Minor Force, increasing your Critical Damage by |cffffff10|r% for the duration.\n\nEnemies who activate the trap are immobilized for |cffffff2|r seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_004_b.dds",
  esoSkillId: 40372,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 2,
  rank: 8,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 755,
  createdAt: "2026-05-28T16:03:32.996Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 0.051612 MaxStat + 0.542543 MaxPower - 0.879855 (Ultimate, ratio = 10.51, Dmg, Bleed, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 0.0156088 MaxStat + 0.162726 MaxPower - 2.99952 (Ultimate, ratio = 10.43, Dmg, Bleed, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999995)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 10% (Constant)",
    "<<6>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
