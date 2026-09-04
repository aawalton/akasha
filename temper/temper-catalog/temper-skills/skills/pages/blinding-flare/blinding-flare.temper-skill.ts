import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blindingFlare = {
  id: "019e6251-4c8b-7fc3-8e29-3c841cebf423",
  pageTypeSlug: "temper-skill",
  slug: "blinding-flare",
  title: "Blinding Flare",
  key: "blinding-flare",
  baseName: "Revealing Flare",
  description:
    '"Launch a blinding flare, revealing stealthed and invisible enemies in the target area for 5 seconds. Exposed enemies are stunned for 4 seconds, and cannot return to stealth or invisibility for 4 seconds.\\n\\nWhile slotted you gain Major Protection, reducing your damage taken by 10%."',
  icon: "/esoui/art/icons/ability_ava_scorching_flare.dds",
  esoSkillId: 63415,
  isMorph: true,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 2,
  rank: 12,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
  effects: "jsonl",
} as const satisfies TemperSkill
