import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRushedCeremony = {
  id: "019e6f53-a976-7a64-b008-3664f356ae26",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-rushed-ceremony",
  title: "Vengeance Rushed Ceremony",
  key: "vengeance-rushed-ceremony",
  baseName: "Vengeance Rushed Ceremony",
  description: '"Heal yourself or an ally for |cffffff16065|r Health."',
  icon: "/esoui/art/icons/ability_templar_rushed_ceremony.dds",
  esoSkillId: 238001,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-restoring-light",
  skillType: "active",
  subcategoryId: "vengeance-templar-restoring-light",
} as const satisfies TemperSkill
