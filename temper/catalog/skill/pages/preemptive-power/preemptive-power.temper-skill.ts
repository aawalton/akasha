import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const preemptivePower = {
  id: "019e6251-4cd6-7caf-8571-d7534325b082",
  type: "page-type/temper-skill",
  slug: "preemptive-power",
  title: "Preemptive Power",
  key: "preemptive-power",
  baseName: "Preemptive Power",
  description: "Start each Scrying attempt with an additional row of facets already claimed.",
  icon: "/esoui/art/icons/ability_scrying_09.dds",
  esoAbilityId: 139777,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/world-scrying",
  skillType: "temper-skill-type/passive",
  hashPlace: 927,
  createdAt: "2026-05-26T03:25:55.798Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
