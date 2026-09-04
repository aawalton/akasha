import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const resonatingGlyphic = {
  id: "019e6245-a70e-7db6-8ac8-0ab83ba9319e",
  pageTypeSlug: "temper-skill",
  slug: "resonating-glyphic",
  title: "Resonating Glyphic",
  key: "resonating-glyphic",
  baseName: "Vitalizing Glyphic",
  description:
    '"Summon an Apocryphal glyphic while in combat, which you and your allies can damage. The glyphic spawns at 70% Health and grows stronger the more you damage it. \\n\\nThe glyphic grants up to 200 Weapon and Spell Damage and heals you and your allies around it for up to 958 Health every 1 second in proportion to its Health."',
  icon: "/esoui/art/icons/ability_arcanist_018_b.dds",
  esoSkillId: 40193558,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "ultimate",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
