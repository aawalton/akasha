import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shadowyDisguise = {
  id: "019e6245-a72a-7d2a-9c09-8b9adc606736",
  type: "page-type/temper-skill",
  slug: "shadowy-disguise",
  title: "Shadowy Disguise",
  key: "shadowy-disguise",
  baseName: "Shadow Cloak",
  description:
    "Cloak yourself in shadow to become invisible. When moving your Magicka Recovery is disabled and when not moving Shadowy Disguise is half cost. Your next direct damage attack will Critically Strike.\n\nWhen Shadowy Disguise begins or ends, you gain Born From Shadow for 10 seconds, increasing your damage done to monsters by 10%.\n\nWhile slotted on either bar, you gain Minor Protection, reducing your damage taken by 5%.",
  icon: "/esoui/art/icons/ability_nightblade_004_a.dds",
  esoSkillId: 36368,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 1156,
  createdAt: "2026-05-26T03:13:12.490Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Shadowy Disguise (Constant)",
    "<<2>> = Born From Shadow (Constant)",
    "<<3>> = 15 seconds (Constant)",
    "<<4>> = 15% (Constant)",
    "<<5>> = Minor Protection (Constant)",
    "<<6>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
