import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const expungeAndModify117940 = {
  id: "019e6f53-a1d4-7be9-bfd6-fe7a19ae2bab",
  type: "page-type/temper-skill",
  slug: "expunge-and-modify-117940",
  title: "Expunge and Modify",
  key: "expunge-and-modify-117940",
  baseName: "Expunge",
  description:
    "Embrace the power of death, removing up to |cffffff2|r negative effects from yourself and restoring |cffffff515|r Magicka and Stamina for each negative effect removed.\n\nWhile slotted, the cost of all your abilities are reduced by |cffffff3|r%.",
  icon: "/esoui/art/icons/ability_necromancer_014_b.dds",
  esoSkillId: 117940,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 490,
  createdAt: "2026-05-28T16:03:32.436Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 2 (Constant)", "<<2>> = 500 (Constant)", "<<3>> = 3% (Constant)"],
} as const satisfies TemperSkill
