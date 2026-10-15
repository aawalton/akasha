import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRushedCeremony = {
  id: "019e6f53-a976-7a64-b008-3664f356ae26",
  type: "page-type/temper-skill",
  slug: "vengeance-rushed-ceremony",
  title: "Vengeance Rushed Ceremony",
  key: "vengeance-rushed-ceremony",
  baseName: "Vengeance Rushed Ceremony",
  description: "Heal yourself or an ally for |cffffff16065|r Health.",
  icon: "/esoui/art/icons/ability_templar_rushed_ceremony.dds",
  esoSkillId: 238001,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1547,
  createdAt: "2026-05-28T16:03:34.390Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 15750 (Constant)"],
} as const satisfies TemperSkill
