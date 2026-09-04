import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ancientKnowledge = {
  id: "019e6226-00d0-7a62-9c9b-0e03c068d57b",
  pageTypeSlug: "temper-skill",
  slug: "ancient-knowledge",
  title: "Ancient Knowledge",
  key: "ancient-knowledge",
  baseName: "Ancient Knowledge",
  description:
    '"Inferno Staves increases your damage done with damage over time and Status Effects by 12%.\\n\\nLightning Staves increases your damage done with direct damage and channeled effects by 12%.\\n\\nEquipping an Ice Staff reduces the cost of blocking by 36% and increases the amount of damage you block by 20%."',
  icon: "/esoui/art/icons/ability_weapon_003.dds",
  esoSkillId: 45513,
  isMorph: false,
  learnedLevel: 46,
  lineRankNeeded: 46,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-destruction-staff",
  skillType: "passive",
  subcategoryId: "weapon-destruction-staff",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
