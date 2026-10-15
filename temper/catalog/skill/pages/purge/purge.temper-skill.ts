import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const purge = {
  id: "019e6f53-a565-7dc1-a28f-43efe1910a7a",
  type: "page-type/temper-skill",
  slug: "purge",
  title: "Purge",
  key: "purge",
  baseName: "Purge",
  description:
    "Cleanse yourself and your group, removing up to |cffffff3|r negative effects immediately.",
  icon: "/esoui/art/icons/ability_ava_005.dds",
  esoSkillId: 38571,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/active",
  hashPlace: 946,
  createdAt: "2026-05-28T16:03:33.349Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3 (Constant)"],
} as const satisfies TemperSkill
