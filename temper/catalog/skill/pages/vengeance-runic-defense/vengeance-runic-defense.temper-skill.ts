import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRunicDefense = {
  id: "019e6f53-a973-7c1f-b5d8-6fe939e23dc6",
  type: "page-type/temper-skill",
  slug: "vengeance-runic-defense",
  title: "Vengeance Runic Defense",
  key: "vengeance-runic-defense",
  baseName: "Vengeance Runic Defense",
  description:
    "Cast forth a complex rune granting you and up to 2 group members Minor Resolve for |cffffff20|r seconds, increasing your Armor by |cffffff2974|r.\n\nYou gain Minor Protection for |cffffff20|r seconds, reducing your damage taken by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_arcanist_010.dds",
  esoSkillId: 238262,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1545,
  createdAt: "2026-05-28T16:03:34.387Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Resolve (Constant)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 2974 (Constant)",
    "<<4>> = Minor Protection (Constant)",
    "<<5>> = 20 seconds (Constant)",
    "<<6>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
