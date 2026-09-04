import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const revealingFlare = {
  id: "019e6f53-a63f-75ec-b9d1-80e786d3b9d3",
  pageTypeSlug: "temper-skill",
  slug: "revealing-flare",
  title: "Revealing Flare",
  key: "revealing-flare",
  baseName: "Revealing Flare",
  description:
    '"Launch a blinding flare, revealing stealthed and invisible enemies in the target area for |cffffff5|r seconds. Exposed enemies cannot return to stealth or invisibility for |cffffff4|r seconds.\\n\\nWhile slotted you gain Major Protection, reducing your damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_ava_revealing_flare.dds",
  esoSkillId: 61489,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 7,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
