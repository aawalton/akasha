import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const naturesGift = {
  id: "019e6245-a6d8-7282-8f0c-adc48bda6e8c",
  type: "page-type/temper-skill",
  slug: "natures-gift",
  title: "Nature's Gift",
  key: "natures-gift",
  baseName: "Nature's Gift",
  description:
    "When you heal an ally with a Green Balance ability, you gain 277 Magicka or 277 Stamina, whichever resource pool is lower. This effect can occur once every 1 second.",
  icon: "/esoui/art/icons/passive_warden_006.dds",
  esoSkillId: 85879,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 851,
  createdAt: "2026-05-26T03:13:12.408Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 250 (Constant)", "<<2>> = 250 (Constant)", "<<3>> = 1 second (Constant)"],
} as const satisfies TemperSkill
