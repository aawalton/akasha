import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const magickaController = {
  id: "019e6238-c2e6-71ba-8b99-a8f9d97b0a07",
  type: "page-type/temper-skill",
  slug: "magicka-controller",
  title: "Magicka Controller",
  key: "magicka-controller",
  baseName: "Magicka Controller",
  description:
    "Increases your Max Magicka and Magicka Recovery by 2% for each Mages Guild ability slotted.\n\nCurrent bonus: 0%.",
  icon: "/esoui/art/icons/ability_sorcerer_044.dds",
  esoSkillId: 45603,
  isMorph: false,
  learnedLevel: 9,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 786,
  createdAt: "2026-05-26T02:59:07.622Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 2% (Constant)",
    "<<2>> = 2 MagesGuild (Mages Guild Skills Slotted, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
