import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const deadlyBash = {
  id: "019e6226-00df-7f02-9920-43196ff5859c",
  type: "page-type/temper-skill",
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
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
