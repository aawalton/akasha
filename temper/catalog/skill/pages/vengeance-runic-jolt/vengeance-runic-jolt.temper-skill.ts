import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRunicJolt = {
  id: "019e6f53-a975-7338-a928-d9e82e0f8046",
  type: "page-type/temper-skill",
  slug: "vengeance-runic-jolt",
  title: "Vengeance Runic Jolt",
  key: "vengeance-runic-jolt",
  baseName: "Vengeance Runic Jolt",
  description:
    "Craft a defensive Apocryphal rune that deals |cffffff5565|r Magic Damage, applies Minor Maim for |cffffff15|r seconds, reducing their damage done by |cffffff5|r%, and generates Crux.",
  icon: "/esoui/art/icons/ability_arcanist_007.dds",
  esoSkillId: 238238,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1546,
  createdAt: "2026-05-28T16:03:34.389Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5250 Magic Damage (Constant)",
    "<<2>> = Minor Maim (Constant)",
    "<<3>> = 15 seconds (Constant)",
    "<<4>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
