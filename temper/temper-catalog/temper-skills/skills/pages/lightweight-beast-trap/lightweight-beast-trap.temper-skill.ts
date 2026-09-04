import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lightweightBeastTrap = {
  id: "019e6238-c2e2-7e88-aa46-ef6b1a3ea2a0",
  pageTypeSlug: "temper-skill",
  slug: "lightweight-beast-trap",
  title: "Lightweight Beast Trap",
  key: "lightweight-beast-trap",
  baseName: "Trap Beast",
  description:
    '"Launch a sharpened blade trap at a target location, which takes 1.5 seconds to arm and lasts for 20 seconds.\\n\\nWhen triggered, the trap deals 1161 Bleed Damage, an additional 3470 Bleed Damage over 20 seconds, and grants you Minor Force, increasing your Critical Damage by 10% for the duration.\\n\\nEnemies who activate the trap are immobilized for 2 seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_004_b.dds",
  esoSkillId: 42771,
  isMorph: true,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
