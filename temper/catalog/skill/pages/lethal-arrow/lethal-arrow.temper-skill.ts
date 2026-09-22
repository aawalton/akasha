import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lethalArrow = {
  id: "019e6226-00fd-75a0-afb3-e304b7048a8b",
  type: "page-type/temper-skill",
  slug: "lethal-arrow",
  title: "Lethal Arrow",
  key: "lethal-arrow",
  baseName: "Snipe",
  description:
    '"Plant a masterfully aimed arrow in an enemy\'s vital spot, dealing 2483 Poison Damage and applying the Poisoned status effect.\\n\\nAlso afflicts enemy with Minor Defile, which reduces their healing received and damage shield strength by 6% for 4 seconds."',
  icon: "/esoui/art/icons/ability_bow_001_a.dds",
  esoSkillId: 40897,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
