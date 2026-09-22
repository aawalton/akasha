import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceLifeAmidDeath = {
  id: "019e6f53-a92f-71d3-836e-4391506bf7fb",
  type: "page-type/temper-skill",
  slug: "vengeance-life-amid-death",
  title: "Vengeance Life amid Death",
  key: "vengeance-life-amid-death",
  baseName: "Vengeance Life amid Death",
  description:
    '"Release residual fragments of fallen souls at the target location, healing you or up to 3 allies in the area for |cffffff10710|r Health."',
  icon: "/esoui/art/icons/ability_necromancer_016.dds",
  esoSkillId: 238258,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-necromancer-living-death",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
