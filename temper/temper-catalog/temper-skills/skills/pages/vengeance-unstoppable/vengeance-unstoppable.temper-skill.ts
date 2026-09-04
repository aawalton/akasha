import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceUnstoppable = {
  id: "019e6f53-a9a5-7ec3-843d-41449c695493",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-unstoppable",
  title: "Vengeance Unstoppable",
  key: "vengeance-unstoppable",
  baseName: "Vengeance Unstoppable",
  description:
    '"Intensify your physical presence to gain Major Resolve, increasing your Physical and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds.\\n\\nAlso grants you immunity to knockback and disabling effects for |cffffff7|r seconds, but reduces your Movement Speed by |cffffff65|r% for the duration."',
  icon: "/esoui/art/icons/ability_armor_001.dds",
  esoSkillId: 247596,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-armor",
  skillType: "active",
  subcategoryId: "vengeance-armor",
} as const satisfies TemperSkill
