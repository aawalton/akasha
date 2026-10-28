import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceReanimate = {
  id: "019e6f53-a95f-79e8-bd45-54608a6b203f",
  type: "page-type/temper-skill",
  slug: "vengeance-reanimate",
  title: "Vengeance Reanimate",
  key: "vengeance-reanimate",
  baseName: "Vengeance Reanimate",
  description:
    "Bring your allies back from the brink of death, resurrecting up to |cffffff3|r allies at the target location.",
  icon: "/esoui/art/icons/ability_necromancer_018.dds",
  esoAbilityId: 238316,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-necromancer-living-death",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1531,
  createdAt: "2026-05-28T16:03:34.367Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
