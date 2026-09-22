import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const expertMage31425 = {
  id: "019e6f53-a1c7-7a09-b71a-fbd6367275c2",
  type: "page-type/temper-skill",
  slug: "expert-mage-31425",
  title: "Expert Mage",
  key: "expert-mage-31425",
  baseName: "Expert Mage",
  description:
    '"Increases your Weapon and Spell Damage by |cffffff54|r for each Sorcerer ability slotted.\\n\\nCurrent bonus: |cffffff0|r."',
  icon: "/esoui/art/icons/ability_sorcerer_044.dds",
  esoSkillId: 31425,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
