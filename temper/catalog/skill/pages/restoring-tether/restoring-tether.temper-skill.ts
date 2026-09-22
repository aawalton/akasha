import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const restoringTether = {
  id: "019e6f53-a634-7c82-87c8-48a1c66accf4",
  type: "page-type/temper-skill",
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
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
