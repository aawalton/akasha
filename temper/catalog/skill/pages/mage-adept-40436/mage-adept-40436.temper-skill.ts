import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mageAdept40436 = {
  id: "019e6f53-a42d-7d11-a900-f6b9a603eb13",
  type: "page-type/temper-skill",
  slug: "mage-adept-40436",
  title: "Mage Adept",
  key: "mage-adept-40436",
  baseName: "Mage Adept",
  description:
    '"Reduces the Magicka and Health cost of your Mages Guild abilities by |cffffff8|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_045.dds",
  esoSkillId: 40436,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
