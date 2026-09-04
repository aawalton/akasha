import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const undeadConfederate = {
  id: "019e6245-a758-7d67-b855-19bd0dba40c2",
  pageTypeSlug: "temper-skill",
  slug: "undead-confederate",
  title: "Undead Confederate",
  key: "undead-confederate",
  baseName: "Undead Confederate",
  description:
    '"While you have a Sacrificial Bones, Skeletal Mage, or Spirit Mender active, your Health, Magicka, and Stamina Recovery is increased by 155."',
  icon: "/esoui/art/icons/passive_necromancer_012.dds",
  esoSkillId: 116283,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-living-death",
  skillType: "passive",
  subcategoryId: "necromancer-living-death",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
