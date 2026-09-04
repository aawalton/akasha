import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRunicDefense = {
  id: "019e6f53-a973-7c1f-b5d8-6fe939e23dc6",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-runic-defense",
  title: "Vengeance Runic Defense",
  key: "vengeance-runic-defense",
  baseName: "Vengeance Runic Defense",
  description:
    '"Cast forth a complex rune granting you and up to 2 group members Minor Resolve for |cffffff20|r seconds, increasing your Armor by |cffffff2974|r.\\n\\nYou gain Minor Protection for |cffffff20|r seconds, reducing your damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_arcanist_010.dds",
  esoSkillId: 238262,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
