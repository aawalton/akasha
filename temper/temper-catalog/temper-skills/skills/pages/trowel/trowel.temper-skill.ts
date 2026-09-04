import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const trowel = {
  id: "019e6251-4cfa-774c-95d8-9661b2e3482d",
  pageTypeSlug: "temper-skill",
  slug: "trowel",
  title: "Trowel",
  key: "trowel",
  baseName: "Trowel",
  description:
    '"Removes 3 layers of dirt or rock from a 1x1 area.\\n\\nCosts 2 Intuition to use.\\nCan safely trigger Fissures to create explosive chain reactions."',
  icon: "/esoui/art/icons/u26_ability_digging_01.dds",
  esoSkillId: 140093,
  isMorph: false,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-excavation",
  skillType: "passive",
  subcategoryId: "world-excavation",
} as const satisfies TemperSkill
