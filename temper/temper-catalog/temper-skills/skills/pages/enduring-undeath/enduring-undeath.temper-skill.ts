import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const enduringUndeath = {
  id: "019e6245-a66b-72e4-92ac-da634a430b83",
  pageTypeSlug: "temper-skill",
  slug: "enduring-undeath",
  title: "Enduring Undeath",
  key: "enduring-undeath",
  baseName: "Life amid Death",
  description:
    '"Release residual fragments of fallen souls at the target location, healing you and your allies for 2399 Health.\\n\\nConsumes a corpse on cast to continue to heal you and your allies in the area for 2390 Health over 5 seconds. You can consume up to 5 additional corpses on cast, with each corpse extending the duration of the heal over time by 5 seconds."',
  icon: "/esoui/art/icons/ability_necromancer_016_b.dds",
  esoSkillId: 40118809,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
