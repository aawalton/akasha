import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceAnnulment = {
  id: "019e6f53-a8ae-76ef-b58a-88cbbd0565b1",
  type: "page-type/temper-skill",
  slug: "vengeance-annulment",
  title: "Vengeance Annulment",
  key: "vengeance-annulment",
  baseName: "Vengeance Annulment",
  description:
    "Convert a portion of your Magicka into a protective ward, gaining a damage shield that absorbs |cffffff4885|r damage for |cffffff6|r seconds. Damage shield strength capped at |cffffff60|r% of your Max Health.",
  icon: "/esoui/art/icons/ability_armor_003.dds",
  esoSkillId: 247561,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-armor",
  skillType: "temper-skill-type/active",
  hashPlace: 1408,
  createdAt: "2026-05-28T16:03:34.190Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.3 Magicka (Magicka, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
