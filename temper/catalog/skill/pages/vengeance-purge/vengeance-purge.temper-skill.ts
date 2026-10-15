import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeancePurge = {
  id: "019e6f53-a958-77db-b601-92147af93217",
  type: "page-type/temper-skill",
  slug: "vengeance-purge",
  title: "Vengeance Purge",
  key: "vengeance-purge",
  baseName: "Vengeance Purge",
  description:
    "Cleanse yourself and up to 2 group members, removing up to |cffffff3|r negative effects immediately.\n\nCan only be cast when you have a negative effect active on yourself.",
  icon: "/esoui/art/icons/ability_ava_005.dds",
  esoSkillId: 244715,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-alliance-war-support",
  skillType: "temper-skill-type/active",
  hashPlace: 1526,
  createdAt: "2026-05-28T16:03:34.360Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3 (Constant)"],
} as const satisfies TemperSkill
