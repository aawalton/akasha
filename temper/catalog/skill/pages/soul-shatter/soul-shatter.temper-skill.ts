import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulShatter = {
  id: "019e6251-4cee-7060-bb09-8f4b77fe7965",
  type: "page-type/temper-skill",
  slug: "soul-shatter",
  title: "Soul Shatter",
  key: "soul-shatter",
  baseName: "Soul Shatter",
  description:
    "When your Health drops below 20% your soul explodes, dealing 1600 Magic Damage to enemies within 8 meters of you.\n\nThis effect can occur once every 2 minutes and scales off your Max Health.",
  icon: "/esoui/art/icons/ability_sorcerer_065.dds",
  esoSkillId: 45583,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 1228,
  createdAt: "2026-05-26T03:25:55.822Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1 Health (Health, Dmg, Magic, AOE, Direct, R2 = 1)",
    "<<2>> = 2 minutes (Constant)",
  ],
} as const satisfies TemperSkill
