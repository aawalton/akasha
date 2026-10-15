import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRuneblades = {
  id: "019e6f53-a96f-74eb-8ff6-a01fb5bf6ef6",
  type: "page-type/temper-skill",
  slug: "vengeance-runeblades",
  title: "Vengeance Runeblades",
  key: "vengeance-runeblades",
  baseName: "Vengeance Runeblades",
  description:
    "Craft an Apocryphal rune before launching it at a foe, dealing |cffffff10017|r Magic Damage and generating Crux.",
  icon: "/esoui/art/icons/ability_arcanist_001.dds",
  esoSkillId: 238169,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 1542,
  createdAt: "2026-05-28T16:03:34.383Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 9450 Magic Damage (Constant)"],
} as const satisfies TemperSkill
