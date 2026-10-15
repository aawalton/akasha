import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceChakramShields = {
  id: "019e6f53-a8d1-7b99-988a-e2ebb01f8eb8",
  type: "page-type/temper-skill",
  slug: "vengeance-chakram-shields",
  title: "Vengeance Chakram Shields",
  key: "vengeance-chakram-shields",
  baseName: "Vengeance Chakram Shields",
  description:
    "Carve the runes of the Blind Man to call forth spinning mystical discs. Discs surround you or up to 2 allies in front of you, granting a shield that absorbs |cffffff8478|r damage for |cffffff6|r seconds.\n\nDiscs prefer your reticle target, or low-Health targets without shields.",
  icon: "/esoui/art/icons/ability_arcanist_015.dds",
  esoSkillId: 238536,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 1433,
  createdAt: "2026-05-28T16:03:34.225Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 (Constant)",
    "<<2>> = 0.429977 Health + 0.0965734 (Health, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<3>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
