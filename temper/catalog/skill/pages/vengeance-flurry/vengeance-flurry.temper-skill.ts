import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceFlurry = {
  id: "019e6f53-a90f-763a-bfbf-9ebdb76e4e4d",
  type: "page-type/temper-skill",
  slug: "vengeance-flurry",
  title: "Vengeance Flurry",
  key: "vengeance-flurry",
  baseName: "Vengeance Flurry",
  description:
    '"Flood an enemy with steel, battering them with four consecutive attacks that each deal |cffffff3200|r Physical Damage."',
  icon: "/esoui/art/icons/ability_dualwield_002.dds",
  esoSkillId: 240585,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-dual-wield",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
