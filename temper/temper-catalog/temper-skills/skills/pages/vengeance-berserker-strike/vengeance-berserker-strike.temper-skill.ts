import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBerserkerStrike = {
  id: "019e6f53-a8bc-76f9-bc77-dbb1a7064358",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-berserker-strike",
  title: "Vengeance Berserker Strike",
  key: "vengeance-berserker-strike",
  baseName: "Vengeance Berserker Strike",
  description:
    '"Strike at an enemy with a vicious blow, dealing |cffffff17640|r Physical Damage to them and up to 2 nearby enemies.\\n\\nThis attack cannot be mitigated and grants you |cffffff22081|r Physical and Spell Resistance for |cffffff12|r seconds."',
  icon: "/esoui/art/icons/ability_2handed_006.dds",
  esoSkillId: 240494,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-two-handed",
  skillType: "ultimate",
  subcategoryId: "vengeance-weapon-two-handed",
} as const satisfies TemperSkill
