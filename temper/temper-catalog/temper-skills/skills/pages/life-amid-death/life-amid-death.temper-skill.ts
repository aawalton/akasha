import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lifeAmidDeath = {
  id: "019e6f53-a3e1-75ae-9417-cfc79612ead3",
  pageTypeSlug: "temper-skill",
  slug: "life-amid-death",
  title: "Life amid Death",
  key: "life-amid-death",
  baseName: "Life amid Death",
  description:
    '"Release residual fragments of fallen souls at the target location, healing you and your allies for |cffffff7305|r Health.\\n\\nConsumes a corpse on cast to continue to heal you and your allies in the area for |cffffff7300|r Health over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_016.dds",
  esoSkillId: 115315,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
