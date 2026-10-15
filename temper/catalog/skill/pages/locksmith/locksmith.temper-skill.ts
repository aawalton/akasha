import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const locksmith = {
  id: "019e6251-4ccf-761a-bbd5-ee040784e5f5",
  type: "page-type/temper-skill",
  slug: "locksmith",
  title: "Locksmith",
  key: "locksmith",
  baseName: "Locksmith",
  description: "Improves your chances of forcing locks by 70%.",
  icon: "/esoui/art/icons/ability_legerdemain_lockpick.dds",
  esoSkillId: 63814,
  isMorph: false,
  learnedLevel: 19,
  lineRankNeeded: 19,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/world-legerdemain",
  skillType: "temper-skill-type/passive",
  hashPlace: 765,
  createdAt: "2026-05-26T03:25:55.791Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 70% (Constant)"],
} as const satisfies TemperSkill
