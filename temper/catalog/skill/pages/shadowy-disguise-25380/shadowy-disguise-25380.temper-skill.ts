import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shadowyDisguise25380 = {
  id: "019e6f53-a6e6-711f-bb9d-f0ee2f3f322f",
  type: "page-type/temper-skill",
  slug: "shadowy-disguise-25380",
  title: "Shadowy Disguise",
  key: "shadowy-disguise-25380",
  baseName: "Shadow Cloak",
  description:
    "Cloak yourself in shadow to become invisible. When moving your Magicka Recovery is disabled and when not moving Shadowy Disguise is half cost. Your next direct damage attack will Critically Strike.\n\nWhen Shadowy Disguise begins or ends, you gain Born From Shadow for |cffffff10|r seconds, increasing your damage done to monsters by |cffffff10|r%.\n\nWhile slotted on either bar, you gain Minor Protection, reducing your damage taken by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_nightblade_004_a.dds",
  esoSkillId: 25380,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 1157,
  createdAt: "2026-05-28T16:03:33.734Z",
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
