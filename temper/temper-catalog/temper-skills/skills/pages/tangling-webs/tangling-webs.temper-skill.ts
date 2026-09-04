import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const tanglingWebs = {
  id: "019e6238-c320-78e1-9b38-623e45c198f8",
  pageTypeSlug: "temper-skill",
  slug: "tangling-webs",
  title: "Tangling Webs",
  key: "tangling-webs",
  baseName: "Trapping Webs",
  description:
    '"Hurl webs to ensnare your foes, reducing the Movement Speed of enemies in the area by 50% and dealing 1742 Physical Damage. After 10 seconds the webs explode, dealing 2323 Poison Damage to enemies within.\\n\\nA ranged ally can activate the Arachnophobia synergy on an affected enemy, dealing 2249 Poison Damage to them, fearing them for 4 seconds, and summoning a spider to attack for 10 seconds. The spider bites enemies for 673 Physical Damage."',
  icon: "/esoui/art/icons/ability_undaunted_003_b.dds",
  esoSkillId: 43477,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
