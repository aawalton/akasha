import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const chakramShields = {
  id: "019e6f53-9fd2-7776-a28f-0d9c27002b9e",
  type: "page-type/temper-skill",
  slug: "chakram-shields",
  title: "Chakram Shields",
  key: "chakram-shields",
  baseName: "Chakram Shields",
  description:
    "Carve the runes of the Blind Man to call forth spinning mystical discs. Discs surround you or up to |cffffff4|r allies in front of you, granting a shield that absorbs |cffffff8084|r damage for |cffffff6|r seconds.\n\nDiscs prefer your reticle target, or low-Health targets without shields.",
  icon: "/esoui/art/icons/ability_arcanist_015.dds",
  esoSkillId: 183447,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 201,
  createdAt: "2026-05-28T16:03:31.922Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.247447 MaxStat - 0.0002048 MaxPower + 0.801106 (Ultimate, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
