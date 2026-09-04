import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deadlyBash = {
  id: "019e6226-00df-7f02-9920-43196ff5859c",
  pageTypeSlug: "temper-skill",
  slug: "deadly-bash",
  title: "Deadly Bash",
  key: "deadly-bash",
  baseName: "Deadly Bash",
  description:
    '"Improves your standard Bash attacks, causing them to deal 500 more damage and cost 50% less Stamina."',
  icon: "/esoui/art/icons/ability_dragonknight_034.dds",
  esoSkillId: 45469,
  isMorph: false,
  learnedLevel: 28,
  lineRankNeeded: 28,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "passive",
  subcategoryId: "weapon-one-hand-and-shield",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
