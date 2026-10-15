import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const revitalize = {
  id: "019e6238-c303-72c5-bb80-fae171e5f355",
  type: "page-type/temper-skill",
  slug: "revitalize",
  title: "Revitalize",
  key: "revitalize",
  baseName: "Revitalize",
  description:
    "Increases the Magicka or Stamina your Heavy Attacks restore by 4% for each piece of Heavy Armor worn.\n\nCurrent bonus: 0%",
  icon: "/esoui/art/icons/ability_armor_013.dds",
  esoSkillId: 45528,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/armor-heavy-armor",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  hashPlace: 1070,
  createdAt: "2026-05-26T02:59:07.651Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 4 HeavyArmor (Heavy Armor, SingleTarget, Direct, R2 = 1)"],
} as const satisfies TemperSkill
