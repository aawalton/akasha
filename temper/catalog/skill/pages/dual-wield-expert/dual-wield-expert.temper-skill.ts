import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dualWieldExpert = {
  id: "019e6226-00e8-70bc-a563-a202d9a3cd1b",
  type: "page-type/temper-skill",
  slug: "dual-wield-expert",
  title: "Dual Wield Expert",
  key: "dual-wield-expert",
  baseName: "Dual Wield Expert",
  description: '"Increases Weapon and Spell Damage by 6% of off-hand weapon\'s damage."',
  icon: "/esoui/art/icons/ability_weapon_013.dds",
  esoSkillId: 45477,
  isMorph: false,
  learnedLevel: 17,
  lineRankNeeded: 17,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
