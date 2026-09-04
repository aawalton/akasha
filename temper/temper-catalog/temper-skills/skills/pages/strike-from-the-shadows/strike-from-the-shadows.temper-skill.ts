import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const strikeFromTheShadows = {
  id: "019e6251-4cf3-739b-b26e-794a01feb056",
  pageTypeSlug: "temper-skill",
  slug: "strike-from-the-shadows",
  title: "Strike from the Shadows",
  key: "strike-from-the-shadows",
  baseName: "Strike from the Shadows",
  description:
    '"When you leave Sneak, invisibility, or Mist Form your Weapon and Spell Damage is increased by 300 for 6 seconds."',
  icon: "/esoui/art/icons/passive_u26_vampire_02.dds",
  esoSkillId: 46040,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-vampire",
  skillType: "passive",
  subcategoryId: "world-vampire",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
