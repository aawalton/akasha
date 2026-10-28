import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reanimate = {
  id: "019e6f53-a5bc-73f3-a814-01367f266e02",
  type: "page-type/temper-skill",
  slug: "reanimate",
  title: "Reanimate",
  key: "reanimate",
  baseName: "Reanimate",
  description:
    "Bring your allies back from the brink of death, resurrecting up to |cffffff3|r allies at the target location.",
  icon: "/esoui/art/icons/ability_necromancer_018.dds",
  esoAbilityId: 115410,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 991,
  createdAt: "2026-05-28T16:03:33.436Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
