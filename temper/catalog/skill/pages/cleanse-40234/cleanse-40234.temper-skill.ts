import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const cleanse40234 = {
  id: "019e6f53-9ff6-7253-97ca-2eade8f16c1d",
  type: "page-type/temper-skill",
  slug: "cleanse-40234",
  title: "Cleanse",
  key: "cleanse-40234",
  baseName: "Purge",
  description:
    "Cleanse yourself and your group, removing |cffffff3|r negative effects immediately.  \n\nFor every negative effect removed, the target is healed for |cffffff5|r% of their Max Health.",
  icon: "/esoui/art/icons/ability_ava_005_b.dds",
  esoSkillId: 40234,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/active",
  hashPlace: 220,
  createdAt: "2026-05-28T16:03:31.958Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 3 (Constant)", "<<2>> = 2% (Constant)"],
} as const satisfies TemperSkill
