import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceLightningForm = {
  id: "019e6f53-a930-7858-af14-0fe663bb62e7",
  type: "page-type/temper-skill",
  slug: "vengeance-lightning-form",
  title: "Vengeance Lightning Form",
  key: "vengeance-lightning-form",
  baseName: "Vengeance Lightning Form",
  description:
    "Manifest yourself as pure lightning, zapping up to 3 nearby enemies with electricity dealing |cffffff5880|r Shock Damage.\n\nYou also gain Major Resolve for |cffffff20|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r.",
  icon: "/esoui/art/icons/ability_sorcerer_lightning_form.dds",
  esoSkillId: 237954,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 1498,
  createdAt: "2026-05-28T16:03:34.320Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 12 (Constant)",
    "<<2>> = 5250 Shock Damage (Constant)",
    "<<3>> = Major Resolve (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 5948 (Constant)",
  ],
} as const satisfies TemperSkill
