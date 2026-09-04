import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const enduringUndeath118809 = {
  id: "019e6f53-a181-7e44-83da-3eded33842f1",
  pageTypeSlug: "temper-skill",
  slug: "enduring-undeath-118809",
  title: "Enduring Undeath",
  key: "enduring-undeath-118809",
  baseName: "Life amid Death",
  description:
    '"Release residual fragments of fallen souls at the target location, healing you and your allies for |cffffff7547|r Health.\\n\\nConsumes a corpse on cast to continue to heal you and your allies in the area for |cffffff7540|r Health over |cffffff5|r seconds. You can consume up to |cffffff5|r additional corpses on cast, with each corpse extending the duration of the heal over time by |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_016_b.dds",
  esoSkillId: 118809,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
