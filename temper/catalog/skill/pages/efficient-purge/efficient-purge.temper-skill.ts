import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const efficientPurge = {
  id: "019e6251-4cad-745c-a800-eed6d61240c0",
  type: "page-type/temper-skill",
  slug: "efficient-purge",
  title: "Efficient Purge",
  key: "efficient-purge",
  baseName: "Purge",
  description: "Cleanse yourself and your group, removing up to 3 negative effects immediately.",
  icon: "/esoui/art/icons/ability_ava_005_a.dds",
  esoSkillId: 46636,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/active",
  hashPlace: 396,
  createdAt: "2026-05-26T03:25:55.757Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3 (Constant)"],
} as const satisfies TemperSkill
