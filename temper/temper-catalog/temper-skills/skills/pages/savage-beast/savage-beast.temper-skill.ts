import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const savageBeast = {
  id: "019e6245-a723-7dbe-8e34-d1810e8303cb",
  pageTypeSlug: "temper-skill",
  slug: "savage-beast",
  title: "Savage Beast",
  key: "savage-beast",
  baseName: "Savage Beast",
  description:
    '"Casting an Animal Companions ability while are in combat generates 4 Ultimate. This effect can occur once every 8 seconds."',
  icon: "/esoui/art/icons/passive_warden_009.dds",
  esoSkillId: 86063,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-animal-companions",
  skillType: "passive",
  subcategoryId: "warden-animal-companions",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
