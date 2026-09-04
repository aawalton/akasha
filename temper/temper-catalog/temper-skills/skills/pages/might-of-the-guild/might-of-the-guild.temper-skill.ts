import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mightOfTheGuild = {
  id: "019e6238-c2ee-7935-9f2c-ee8f513fd311",
  pageTypeSlug: "temper-skill",
  slug: "might-of-the-guild",
  title: "Might of the Guild",
  key: "might-of-the-guild",
  baseName: "Might of the Guild",
  description:
    '"Casting a Mages Guild ability grants you Empower, increasing the damage of your Heavy Attacks against monsters by 70% for 10 seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoSkillId: 45607,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-mages-guild",
  skillType: "passive",
  subcategoryId: "guild-mages-guild",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
