import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mightOfTheGuild43561 = {
  id: "019e6f53-a487-7f38-a4ba-12ab80600e3d",
  type: "page-type/temper-skill",
  slug: "might-of-the-guild-43561",
  title: "Might of the Guild",
  key: "might-of-the-guild-43561",
  baseName: "Might of the Guild",
  description:
    "Casting a Mages Guild ability grants you Empower, increasing the damage of your Heavy Attacks against monsters by |cffffff70|r% for |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoSkillId: 43561,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 9,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/passive",
  hashPlace: 828,
  createdAt: "2026-05-28T16:03:33.127Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Empower (Constant)",
    "<<2>> = 150% (Constant)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
