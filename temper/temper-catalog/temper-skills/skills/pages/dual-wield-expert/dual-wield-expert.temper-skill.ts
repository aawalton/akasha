import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dualWieldExpert = {
  id: "019e6226-00e8-70bc-a563-a202d9a3cd1b",
  pageTypeSlug: "temper-skill",
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
  skillLineId: "weapon-dual-wield",
  skillType: "passive",
  subcategoryId: "weapon-dual-wield",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
