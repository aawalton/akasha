import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const animateBlastbones = {
  id: "019e6245-a5eb-7fee-9046-3032c81e1890",
  pageTypeSlug: "temper-skill",
  slug: "animate-blastbones",
  title: "Animate Blastbones",
  key: "animate-blastbones",
  baseName: "Reanimate",
  description:
    '"Bring your allies back from the brink of death, resurrecting up to 3 allies at the target location.\\n\\nYou consume up to 3 other corpses in the area and summon a Blighted Blastbones for each corpse consumed."',
  icon: "/esoui/art/icons/ability_necromancer_018_b.dds",
  esoSkillId: 40118379,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-living-death",
  skillType: "ultimate",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
