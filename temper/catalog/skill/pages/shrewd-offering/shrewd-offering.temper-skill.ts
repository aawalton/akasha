import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shrewdOffering = {
  id: "019e6245-a731-73b6-a07a-806ecab4d5b1",
  type: "page-type/temper-skill",
  slug: "shrewd-offering",
  title: "Shrewd Offering",
  key: "shrewd-offering",
  baseName: "Malevolent Offering",
  description:
    "Pour out your lifesblood and channel the arcane, healing yourself or an ally in front of you for 3485 Health, while draining 810 Health from yourself over 2 seconds.",
  icon: "/esoui/art/icons/ability_nightblade_011_b.dds",
  esoSkillId: 36129,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1177,
  createdAt: "2026-05-26T03:13:12.497Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 810 (Constant)",
    "<<3>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
