import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const restoringTether = {
  id: "019e6f53-a634-7c82-87c8-48a1c66accf4",
  pageTypeSlug: "temper-skill",
  slug: "restoring-tether",
  title: "Restoring Tether",
  key: "restoring-tether",
  baseName: "Restoring Tether",
  description:
    '"Siphon the last remnants of life from a corpse, healing for |cffffff17514|r Health over |cffffff12|r seconds to yourself and all allies between you and the corpse. \\n\\nWhile slotted, your healing done is increased by |cffffff3|r%."',
  icon: "/esoui/art/icons/ability_necromancer_017.dds",
  esoSkillId: 115926,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
