import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceChakramShields = {
  id: "019e6f53-a8d1-7b99-988a-e2ebb01f8eb8",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-chakram-shields",
  title: "Vengeance Chakram Shields",
  key: "vengeance-chakram-shields",
  baseName: "Vengeance Chakram Shields",
  description:
    '"Carve the runes of the Blind Man to call forth spinning mystical discs. Discs surround you or up to 2 allies in front of you, granting a shield that absorbs |cffffff8478|r damage for |cffffff6|r seconds.\\n\\nDiscs prefer your reticle target, or low-Health targets without shields."',
  icon: "/esoui/art/icons/ability_arcanist_015.dds",
  esoSkillId: 238536,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-curative-runeforms",
} as const satisfies TemperSkill
