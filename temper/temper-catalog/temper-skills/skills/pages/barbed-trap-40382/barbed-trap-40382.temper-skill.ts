import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const barbedTrap40382 = {
  id: "019e6f53-9eed-760f-be35-c55662de5741",
  pageTypeSlug: "temper-skill",
  slug: "barbed-trap-40382",
  title: "Barbed Trap",
  key: "barbed-trap-40382",
  baseName: "Trap Beast",
  description:
    '"Set a sharpened blade trap at your location, which takes |cffffff1.5|r seconds to arm and lasts for |cffffff20|r seconds.\\n\\nWhen triggered, the trap deals |cffffff5004|r Bleed Damage, an additional |cffffff11790|r Bleed Damage over |cffffff20|r seconds, and grants you Minor Force, increasing your Critical Damage by |cffffff10|r% for the duration.\\n\\nEnemies hit by the initial hit are afflicted with the Hemorrhaging status effect.\\n\\n Enemies who activate the trap are immobilized for |cffffff2|r seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_004_a.dds",
  esoSkillId: 40382,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
