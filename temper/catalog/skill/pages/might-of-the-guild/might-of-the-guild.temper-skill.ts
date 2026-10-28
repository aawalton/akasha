import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mightOfTheGuild = {
  id: "019e6238-c2ee-7935-9f2c-ee8f513fd311",
  type: "page-type/temper-skill",
  slug: "might-of-the-guild",
  title: "Might of the Guild",
  key: "might-of-the-guild",
  baseName: "Might of the Guild",
  description:
    "Casting a Mages Guild ability grants you Empower, increasing the damage of your Heavy Attacks against monsters by 70% for 10 seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoAbilityId: 45607,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 827,
  createdAt: "2026-05-26T02:59:07.630Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
  equations: [
    "<<1>> = Empower (Constant)",
    "<<2>> = 150% (Constant)",
    "<<3>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
