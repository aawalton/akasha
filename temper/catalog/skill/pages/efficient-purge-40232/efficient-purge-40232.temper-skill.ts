import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const efficientPurge40232 = {
  id: "019e6f53-a108-797f-80dc-38359cf5a751",
  type: "page-type/temper-skill",
  slug: "efficient-purge-40232",
  title: "Efficient Purge",
  key: "efficient-purge-40232",
  baseName: "Purge",
  description:
    "Cleanse yourself and your group, removing up to |cffffff3|r negative effects immediately.",
  icon: "/esoui/art/icons/ability_ava_005_a.dds",
  esoSkillId: 40232,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/active",
  hashPlace: 397,
  createdAt: "2026-05-28T16:03:32.232Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3 (Constant)"],
} as const satisfies TemperSkill
