import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const glyphicOfTheTides = {
  id: "019e6245-a693-7c43-80cb-a5249f3ca2ad",
  type: "page-type/temper-skill",
  slug: "glyphic-of-the-tides",
  title: "Glyphic of the Tides",
  key: "glyphic-of-the-tides",
  baseName: "Vitalizing Glyphic",
  description:
    "Summon an Apocryphal glyphic, which you and your allies can heal. The glyphic spawns at 53% Health and grows stronger the more you heal it.\n\nThe power within the glyphic grants up to 200 Weapon and Spell Damage and heals you and your allies around it for up to 928 Health every 1 second in proportion to its Health.\n\nAt full Health the glyphic grants Major Protection, reducing damage taken by 10%.",
  icon: "/esoui/art/icons/ability_arcanist_018_a.dds",
  esoSkillId: 40193794,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 569,
  createdAt: "2026-05-26T03:13:12.339Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 53% (Constant)",
    "<<2>> = 0.04132 MaxStat + 0.43386 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, Direct, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = Major Protection (Constant)",
    "<<5>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
