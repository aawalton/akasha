import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const trappingWebs = {
  id: "019e6f53-a85d-776d-969c-0ea26bcce66a",
  pageTypeSlug: "temper-skill",
  slug: "trapping-webs",
  title: "Trapping Webs",
  key: "trapping-webs",
  baseName: "Trapping Webs",
  description:
    '"Hurl webs to ensnare your foes, reducing the Movement Speed of enemies in the area by |cffffff50|r% and dealing |cffffff6400|r Physical Damage. After |cffffff10|r seconds the webs explode, dealing |cffffff8533|r Poison Damage to enemies within.\\n\\nA ranged ally can activate the Spawn Broodling synergy on an affected enemy, dealing |cffffff7819|r Poison Damage to them and summoning a spider to attack for |cffffff10|r seconds. The spider bites enemies for |cffffff2346|r Physical Damage."',
  icon: "/esoui/art/icons/ability_undaunted_003.dds",
  esoSkillId: 39425,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
