import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const renewingUndeath = {
  id: "019e6245-a70b-7923-9f58-a4af38ff5953",
  pageTypeSlug: "temper-skill",
  slug: "renewing-undeath",
  title: "Renewing Undeath",
  key: "renewing-undeath",
  baseName: "Life amid Death",
  description:
    '"Release residual fragments of fallen souls at the target location, healing you and your allies for 2399 Health.\\n\\nConsumes a corpse on cast to immediately remove up to 3 negative effects and continue to heal you and your allies in the area for 2390 Health over 5 seconds."',
  icon: "/esoui/art/icons/ability_necromancer_016_a.dds",
  esoSkillId: 40118017,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
