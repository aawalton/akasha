import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const radiantAura = {
  id: "019e6245-a6f7-79fb-b2b9-cc9bb1eca7d8",
  type: "page-type/temper-skill",
  slug: "radiant-aura",
  title: "Radiant Aura",
  key: "radiant-aura",
  baseName: "Restoring Aura",
  description:
    "Champion the cause of divine glory to apply Minor Endurance, Minor Fortitude, and Minor Intellect to you and nearby group members for 1 minute, increasing your Health, Magicka, and Stamina Recovery by 15%.\n\nWhile slotted on either bar you gain these effects.",
  icon: "/esoui/art/icons/ability_templar_life_giving_sigil.dds",
  esoSkillId: 27030,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 957,
  createdAt: "2026-05-26T03:13:12.439Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Minor Endurance (Constant)",
    "<<2>> = Minor Fortitude (Constant)",
    "<<3>> = Minor Intellect (Constant)",
    "<<4>> = 1 minute (Constant)",
    "<<5>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill
