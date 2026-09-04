import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shadowyDisguise25380 = {
  id: "019e6f53-a6e6-711f-bb9d-f0ee2f3f322f",
  pageTypeSlug: "temper-skill",
  slug: "shadowy-disguise-25380",
  title: "Shadowy Disguise",
  key: "shadowy-disguise-25380",
  baseName: "Shadow Cloak",
  description:
    '"Cloak yourself in shadow to become invisible. When moving your Magicka Recovery is disabled and when not moving Shadowy Disguise is half cost. Your next direct damage attack will Critically Strike.\\n\\nWhen Shadowy Disguise begins or ends, you gain Born From Shadow for |cffffff10|r seconds, increasing your damage done to monsters by |cffffff10|r%.\\n\\nWhile slotted on either bar, you gain Minor Protection, reducing your damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_nightblade_004_a.dds",
  esoSkillId: 25380,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
