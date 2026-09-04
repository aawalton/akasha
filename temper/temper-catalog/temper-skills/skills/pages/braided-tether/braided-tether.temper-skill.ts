import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const braidedTether = {
  id: "019e6245-a605-7df1-9f8d-5535b4a2a704",
  pageTypeSlug: "temper-skill",
  slug: "braided-tether",
  title: "Braided Tether",
  key: "braided-tether",
  baseName: "Restoring Tether",
  description:
    '"Siphon the last remnants of life from a corpse, healing for 5742 Health over 12 seconds to yourself, all allies around you, and all allies between you and the corpse. \\n\\nWhile slotted, your healing done is increased by 3%."',
  icon: "/esoui/art/icons/ability_necromancer_017_a.dds",
  esoSkillId: 40118070,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
  effects: "jsonl",
} as const satisfies TemperSkill
