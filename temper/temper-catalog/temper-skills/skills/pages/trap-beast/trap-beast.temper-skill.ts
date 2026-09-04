import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const trapBeast = {
  id: "019e6f53-a85c-70a0-b8b3-796afcc8cfaa",
  pageTypeSlug: "temper-skill",
  slug: "trap-beast",
  title: "Trap Beast",
  key: "trap-beast",
  baseName: "Trap Beast",
  description:
    '"Set a sharpened blade trap at your location, which takes |cffffff1.5|r seconds to arm and lasts for |cffffff20|r seconds. \\n\\nWhen triggered, the trap deals |cffffff4036|r Bleed Damage, an additional |cffffff11420|r Bleed Damage over |cffffff20|r seconds, and grants you Minor Force, increasing your Critical Damage by |cffffff10|r% for the duration.\\n\\nEnemies who activate the trap are immobilized for |cffffff2|r seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_004.dds",
  esoSkillId: 35750,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
