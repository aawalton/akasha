import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const cleanse = {
  id: "019e6251-4c9b-7a90-bb2b-767c68b293c2",
  type: "page-type/temper-skill",
  slug: "cleanse",
  title: "Cleanse",
  key: "cleanse",
  baseName: "Purge",
  description:
    "Cleanse yourself and your group, removing 3 negative effects immediately.  \n\nFor every negative effect removed, the target is healed for 5% of their Max Health.",
  icon: "/esoui/art/icons/ability_ava_005_b.dds",
  esoSkillId: 46644,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/active",
  hashPlace: 219,
  createdAt: "2026-05-26T03:25:55.739Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3 (Constant)", "<<2>> = 5% (Constant)"],
} as const satisfies TemperSkill
