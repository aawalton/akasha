import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceShieldWall = {
  id: "019e6f53-a981-7fc0-8bcc-9a9d6c557e72",
  type: "page-type/temper-skill",
  slug: "vengeance-shield-wall",
  title: "Vengeance Shield Wall",
  key: "vengeance-shield-wall",
  baseName: "Vengeance Shield Wall",
  description:
    "Reinforce your shield, allowing you to automatically block all attacks at no cost for |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_1handed_006.dds",
  esoSkillId: 240572,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-one-hand-and-shield",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1555,
  createdAt: "2026-05-28T16:03:34.401Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 5 seconds (Constant)"],
} as const satisfies TemperSkill
