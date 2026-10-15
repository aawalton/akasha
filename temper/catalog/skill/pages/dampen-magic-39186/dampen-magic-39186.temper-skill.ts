import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dampenMagic39186 = {
  id: "019e6f53-a06d-76bf-a7b9-a98d18298305",
  type: "page-type/temper-skill",
  slug: "dampen-magic-39186",
  title: "Dampen Magic",
  key: "dampen-magic-39186",
  baseName: "Annulment",
  description:
    "Convert a portion of your Magicka into a protective ward, gaining a damage shield that absorbs |cffffff5046|r damage for |cffffff6|r seconds. Damage shield strength capped at |cffffff60|r% of your Max Health.\n\nEach piece of Light Armor worn increases the amount of damage absorbed by |cffffff6|r%.",
  icon: "/esoui/art/icons/ability_armor_003_a.dds",
  esoSkillId: 39186,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 1,
  rank: 22,
  skillLineId: "temper-skill-line/armor-light-armor",
  skillType: "temper-skill-type/active",
  hashPlace: 301,
  createdAt: "2026-05-28T16:03:32.077Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.3099 Magicka (Magicka, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 3 (Constant)",
  ],
} as const satisfies TemperSkill
