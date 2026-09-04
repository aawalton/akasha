import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mortalCoil = {
  id: "019e6245-a6d3-7b9e-ae16-1a5fac6d5651",
  pageTypeSlug: "temper-skill",
  slug: "mortal-coil",
  title: "Mortal Coil",
  key: "mortal-coil",
  baseName: "Restoring Tether",
  description:
    '"Siphon the last remnants of life from a corpse, healing for 5562 Health over 12 seconds to yourself and all allies between you and the corpse.  \\n\\nYou also restore 170 Magicka and Stamina every 2 seconds while siphoning the corpse.\\n\\nWhile slotted, your healing done is increased by 3%."',
  icon: "/esoui/art/icons/ability_necromancer_017_b.dds",
  esoSkillId: 40118122,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
  effects: "jsonl",
} as const satisfies TemperSkill
