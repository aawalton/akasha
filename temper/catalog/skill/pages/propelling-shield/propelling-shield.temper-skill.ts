import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const propellingShield = {
  id: "019e6251-4cd8-7124-b08a-706c69c62474",
  type: "page-type/temper-skill",
  slug: "propelling-shield",
  title: "Propelling Shield",
  key: "propelling-shield",
  baseName: "Siege Shield",
  description:
    "Create a protective sphere over your location that reduces damage taken from siege weapons by 50% for you and nearby allies.\n\nAlso increases the range of abilities with a range greater than 28 meters by 7 meters. Does not affect Leap, Move Position, and Pull abilities.",
  icon: "/esoui/art/icons/ability_ava_004_a.dds",
  esoSkillId: 46670,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/active",
  hashPlace: 932,
  createdAt: "2026-05-26T03:25:55.800Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 50% (Constant)", "<<2>> = 7 meters (Constant)"],
} as const satisfies TemperSkill
