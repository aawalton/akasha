import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const renewingAnimation = {
  id: "019e6245-a70a-7845-877a-9e2e1a811fc2",
  type: "page-type/temper-skill",
  slug: "renewing-animation",
  title: "Renewing Animation",
  key: "renewing-animation",
  baseName: "Reanimate",
  description:
    '"Bring your allies back from the brink of death, resurrecting up to 3 allies at the target location.\\n\\nYou restore 5300 Magicka and Stamina for each ally you successfully resurrect."',
  icon: "/esoui/art/icons/ability_necromancer_018_a.dds",
  esoSkillId: 40118367,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-living-death",
  skillType: "temper-skill-type/ultimate",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
