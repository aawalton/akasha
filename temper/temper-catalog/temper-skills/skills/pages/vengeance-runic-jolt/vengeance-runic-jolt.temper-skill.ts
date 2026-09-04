import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRunicJolt = {
  id: "019e6f53-a975-7338-a928-d9e82e0f8046",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-runic-jolt",
  title: "Vengeance Runic Jolt",
  key: "vengeance-runic-jolt",
  baseName: "Vengeance Runic Jolt",
  description:
    '"Craft a defensive Apocryphal rune that deals |cffffff5565|r Magic Damage, applies Minor Maim for |cffffff15|r seconds, reducing their damage done by |cffffff5|r%, and generates Crux."',
  icon: "/esoui/art/icons/ability_arcanist_007.dds",
  esoSkillId: 238238,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
