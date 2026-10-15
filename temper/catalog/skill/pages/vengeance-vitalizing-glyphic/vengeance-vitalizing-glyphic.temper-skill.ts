import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceVitalizingGlyphic = {
  id: "019e6f53-a9ab-7c6e-b32b-0156061f3f21",
  type: "page-type/temper-skill",
  slug: "vengeance-vitalizing-glyphic",
  title: "Vengeance Vitalizing Glyphic",
  key: "vengeance-vitalizing-glyphic",
  baseName: "Vengeance Vitalizing Glyphic",
  description:
    "Call forth an Apocryphal glyphic for |cffffff6|r seconds, which heals you or up to 3 allies around it for |cffffff9180|r Health every |cffffff1|r second and grants Major Force while in the area, increasing Critical Damage by |cffffff20|r%.",
  icon: "/esoui/art/icons/ability_arcanist_018.dds",
  esoSkillId: 238549,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-arcanist-curative-runeforms",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1584,
  createdAt: "2026-05-28T16:03:34.443Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 6 (Constant)",
    "<<3>> = 9000 (Constant)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = Major Force (Constant)",
    "<<6>> = 20 (Constant)",
  ],
} as const satisfies TemperSkill
