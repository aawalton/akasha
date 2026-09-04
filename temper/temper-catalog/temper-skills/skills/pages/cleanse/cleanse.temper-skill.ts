import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cleanse = {
  id: "019e6251-4c9b-7a90-bb2b-767c68b293c2",
  pageTypeSlug: "temper-skill",
  slug: "cleanse",
  title: "Cleanse",
  key: "cleanse",
  baseName: "Purge",
  description:
    '"Cleanse yourself and your group, removing 3 negative effects immediately.  \\n\\nFor every negative effect removed, the target is healed for 5% of their Max Health."',
  icon: "/esoui/art/icons/ability_ava_005_b.dds",
  esoSkillId: 46644,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
