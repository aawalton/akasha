import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const savageBeast = {
  id: "019e6245-a723-7dbe-8e34-d1810e8303cb",
  type: "page-type/temper-skill",
  slug: "savage-beast",
  title: "Savage Beast",
  key: "savage-beast",
  baseName: "Savage Beast",
  description:
    "Casting an Animal Companions ability while are in combat generates 4 Ultimate. This effect can occur once every 8 seconds.",
  icon: "/esoui/art/icons/passive_warden_009.dds",
  esoSkillId: 86063,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 1130,
  createdAt: "2026-05-26T03:13:12.483Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 4 (Constant)", "<<2>> = 8 seconds (Constant)"],
} as const satisfies TemperSkill
