import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const keenEyeRuneStones47851 = {
  id: "019e6f53-a3aa-7828-ba1c-f7a245b4a01e",
  type: "page-type/temper-skill",
  slug: "keen-eye-rune-stones-47851",
  title: "Keen Eye: Rune Stones",
  key: "keen-eye-rune-stones-47851",
  baseName: "Keen Eye: Rune Stones",
  description:
    "Runes in the world will be easier to see when you are |cffffff20|r meters or closer.",
  icon: "/esoui/art/icons/ability_smith_002.dds",
  esoSkillId: 47851,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/craft-enchanting",
  skillType: "temper-skill-type/passive",
  hashPlace: 715,
  createdAt: "2026-05-28T16:03:32.906Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 20 meters (Constant)"],
} as const satisfies TemperSkill
