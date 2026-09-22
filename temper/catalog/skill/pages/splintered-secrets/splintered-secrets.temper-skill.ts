import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const splinteredSecrets = {
  id: "019e6245-a741-75fa-be8b-dfc5706f2875",
  type: "page-type/temper-skill",
  slug: "splintered-secrets",
  title: "Splintered Secrets",
  key: "splintered-secrets",
  baseName: "Splintered Secrets",
  description:
    '"What they don\'t know can kill them. Increase your Physical and Spell Penetration by 1240 per Herald of the Tome ability slotted.\\n\\nCurrent bonus: 0."',
  icon: "/esoui/art/icons/passive_arcanist_01.dds",
  esoSkillId: 184887,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
