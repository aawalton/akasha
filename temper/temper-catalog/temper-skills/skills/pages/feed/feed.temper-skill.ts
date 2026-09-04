import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const feed = {
  id: "019e6251-4cb6-750c-bde3-1df3eb687d2c",
  pageTypeSlug: "temper-skill",
  slug: "feed",
  title: "Feed",
  key: "feed",
  baseName: "Feed",
  description:
    '"Allows you to feed on an unsuspecting target, killing them and increasing your Vampire Stage. Higher Stages make you a stronger Vampire at the cost of your humanity. Stages decrease over long periods of time. \\n\\nStage 1/2/3/4\\n\\nHealth Recovery: -10%/-30%/-60%/-100%\\nFlame Damage Taken: +5%/+8%/+13%/+20%\\nRegular Ability Costs: +3%/+5%/+8%/+12%\\nVampire Ability Costs: -6%/-10%/-16%/-24%"',
  icon: "/esoui/art/icons/passive_u26_vampire_06.dds",
  esoSkillId: 42054,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-vampire",
  skillType: "passive",
  subcategoryId: "world-vampire",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
