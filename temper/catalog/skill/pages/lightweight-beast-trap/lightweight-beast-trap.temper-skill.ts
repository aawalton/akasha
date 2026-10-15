import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lightweightBeastTrap = {
  id: "019e6238-c2e2-7e88-aa46-ef6b1a3ea2a0",
  type: "page-type/temper-skill",
  slug: "lightweight-beast-trap",
  title: "Lightweight Beast Trap",
  key: "lightweight-beast-trap",
  baseName: "Trap Beast",
  description:
    "Launch a sharpened blade trap at a target location, which takes 1.5 seconds to arm and lasts for 20 seconds.\n\nWhen triggered, the trap deals 1161 Bleed Damage, an additional 3470 Bleed Damage over 20 seconds, and grants you Minor Force, increasing your Critical Damage by 10% for the duration.\n\nEnemies who activate the trap are immobilized for 2 seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_004_b.dds",
  esoSkillId: 42771,
  isMorph: true,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 754,
  createdAt: "2026-05-26T02:59:07.618Z",
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
