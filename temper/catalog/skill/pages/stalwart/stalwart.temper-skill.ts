import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const stalwart = {
  id: "019e624a-12e1-74c4-a94d-9622e6599c5c",
  type: "page-type/temper-skill",
  slug: "stalwart",
  title: "Stalwart",
  key: "stalwart",
  baseName: "Stalwart",
  description:
    "Increases your Max Stamina by 1500.\n\nWhen you take damage, you gain 5 Ultimate.  This effect can occur once every 10 seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_018.dds",
  esoSkillId: 45298,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/racial-nord-skills",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
  hashPlace: 1263,
  createdAt: "2026-05-26T03:18:02.209Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 1500 (Constant)", "<<2>> = 5 (Constant)", "<<3>> = 10 seconds (Constant)"],
} as const satisfies TemperSkill
