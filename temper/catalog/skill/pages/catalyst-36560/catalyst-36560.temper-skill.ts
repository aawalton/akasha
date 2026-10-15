import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const catalyst36560 = {
  id: "019e6f53-9fc0-7f47-a10e-2f6252fc3ec7",
  type: "page-type/temper-skill",
  slug: "catalyst-36560",
  title: "Catalyst",
  key: "catalyst-36560",
  baseName: "Catalyst",
  description: "After drinking a potion you gain |cffffff11|r Ultimate.",
  icon: "/esoui/art/icons/passive_sorcerer_046.dds",
  esoSkillId: 36560,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/passive",
  hashPlace: 192,
  createdAt: "2026-05-28T16:03:31.904Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 11 (Constant)"],
} as const satisfies TemperSkill
