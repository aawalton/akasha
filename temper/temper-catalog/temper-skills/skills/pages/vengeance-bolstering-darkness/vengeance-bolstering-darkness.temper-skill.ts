import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBolsteringDarkness = {
  id: "019e6f53-a8c4-7f26-bca0-9159abbe253e",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-bolstering-darkness",
  title: "Vengeance Bolstering Darkness",
  key: "vengeance-bolstering-darkness",
  baseName: "Vengeance Bolstering Darkness",
  description:
    '"Conjure concealing shadow around you, granting you and up to 3 nearby allies invisibility for |cffffff4|r seconds and Major Protection for |cffffff10|r seconds, reducing damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_nightblade_015.dds",
  esoSkillId: 237702,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-shadow",
  skillType: "ultimate",
  subcategoryId: "vengeance-nightblade-shadow",
} as const satisfies TemperSkill
