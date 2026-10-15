import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceShieldCharge = {
  id: "019e6f53-a980-78b9-9fb5-4ae3eb8bdffe",
  type: "page-type/temper-skill",
  slug: "vengeance-shield-charge",
  title: "Vengeance Shield Charge",
  key: "vengeance-shield-charge",
  baseName: "Vengeance Shield Charge",
  description: "Rush an enemy and ram them, stunning them for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_1handed_003.dds",
  esoSkillId: 240564,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 1554,
  createdAt: "2026-05-28T16:03:34.400Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 4 seconds (Constant)"],
} as const satisfies TemperSkill
