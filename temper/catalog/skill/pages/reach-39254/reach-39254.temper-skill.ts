import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reach39254 = {
  id: "019e6f53-a5ba-7be9-9f07-35c7b8e4671e",
  type: "page-type/temper-skill",
  slug: "reach-39254",
  title: "Reach",
  key: "reach-39254",
  baseName: "Reach",
  description:
    "Increases the range of long-range abilities by |cffffff2|r meters while near a keep or outpost.\n\nAny ability with a range greater than |cffffff28|r meters is affected.",
  icon: "/esoui/art/icons/ability_weapon_001.dds",
  esoSkillId: 39254,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/passive",
  hashPlace: 990,
  createdAt: "2026-05-28T16:03:33.434Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 2 meters (Constant)"],
} as const satisfies TemperSkill
