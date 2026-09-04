import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lacerate = {
  id: "019e6f53-a3b8-7f41-809c-c88aac1c7ccc",
  pageTypeSlug: "temper-skill",
  slug: "lacerate",
  title: "Lacerate",
  key: "lacerate",
  baseName: "Lacerate",
  description:
    '"Slash enemies in front of you, causing them to bleed for |cffffff22860|r Bleed Damage over |cffffff8|r seconds and healing you for |cffffff51|r% of the damage done.\\n\\nEach tick applies the Hemorrhaging status effect."',
  icon: "/esoui/art/icons/ability_dualwield_006.dds",
  esoSkillId: 83600,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "weapon-dual-wield",
  skillType: "ultimate",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
