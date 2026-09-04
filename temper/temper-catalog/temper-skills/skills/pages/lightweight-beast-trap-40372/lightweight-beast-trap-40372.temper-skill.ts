import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lightweightBeastTrap40372 = {
  id: "019e6f53-a404-7b1e-a182-eb17a9d7e22e",
  pageTypeSlug: "temper-skill",
  slug: "lightweight-beast-trap-40372",
  title: "Lightweight Beast Trap",
  key: "lightweight-beast-trap-40372",
  baseName: "Trap Beast",
  description:
    '"Launch a sharpened blade trap at a target location, which takes |cffffff1.5|r seconds to arm and lasts for |cffffff20|r seconds.\\n\\nWhen triggered, the trap deals |cffffff4038|r Bleed Damage, an additional |cffffff11420|r Bleed Damage over |cffffff20|r seconds, and grants you Minor Force, increasing your Critical Damage by |cffffff10|r% for the duration.\\n\\nEnemies who activate the trap are immobilized for |cffffff2|r seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_004_b.dds",
  esoSkillId: 40372,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 2,
  rank: 8,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
