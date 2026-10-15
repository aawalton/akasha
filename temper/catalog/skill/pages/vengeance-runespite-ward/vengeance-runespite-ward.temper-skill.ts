import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRunespiteWard = {
  id: "019e6f53-a972-75a4-a54c-012af2e04e66",
  type: "page-type/temper-skill",
  slug: "vengeance-runespite-ward",
  title: "Vengeance Runespite Ward",
  key: "vengeance-runespite-ward",
  baseName: "Vengeance Runespite Ward",
  description:
    "Like the rune knights of old, summon a shield that absorbs |cffffff14490|r damage for |cffffff6|r seconds.\n\nConsume Crux to heal yourself for |cffffff1508|r Health, scaling off your Max Health, per Crux spent.",
  icon: "/esoui/art/icons/ability_arcanist_008.dds",
  esoSkillId: 238249,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1544,
  createdAt: "2026-05-28T16:03:34.386Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 12600 (Constant)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 0.075 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
