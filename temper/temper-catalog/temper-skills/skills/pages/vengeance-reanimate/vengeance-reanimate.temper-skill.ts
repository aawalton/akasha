import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceReanimate = {
  id: "019e6f53-a95f-79e8-bd45-54608a6b203f",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-reanimate",
  title: "Vengeance Reanimate",
  key: "vengeance-reanimate",
  baseName: "Vengeance Reanimate",
  description:
    '"Bring your allies back from the brink of death, resurrecting up to |cffffff3|r allies at the target location."',
  icon: "/esoui/art/icons/ability_necromancer_018.dds",
  esoSkillId: 238316,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-living-death",
  skillType: "ultimate",
  subcategoryId: "vengeance-necromancer-living-death",
} as const satisfies TemperSkill
