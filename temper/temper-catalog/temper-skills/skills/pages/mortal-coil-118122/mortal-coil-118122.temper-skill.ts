import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mortalCoil118122 = {
  id: "019e6f53-a49d-7493-809d-fb2846c28b86",
  pageTypeSlug: "temper-skill",
  slug: "mortal-coil-118122",
  title: "Mortal Coil",
  key: "mortal-coil-118122",
  baseName: "Restoring Tether",
  description:
    '"Siphon the last remnants of life from a corpse, healing for |cffffff17514|r Health over |cffffff12|r seconds to yourself and all allies between you and the corpse.  \\n\\nYou also restore |cffffff170|r Magicka and Stamina every |cffffff2|r seconds while siphoning the corpse.\\n\\nWhile slotted, your healing done is increased by |cffffff3|r%."',
  icon: "/esoui/art/icons/ability_necromancer_017_b.dds",
  esoSkillId: 118122,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
