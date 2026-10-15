import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shuffle = {
  id: "019e6238-c30d-7c9e-b0b1-d6e43940efcc",
  type: "page-type/temper-skill",
  slug: "shuffle",
  title: "Shuffle",
  key: "shuffle",
  baseName: "Evasion",
  description:
    "Shroud yourself in mist to gain Major Evasion, decreasing damage taken from area attacks by 20% for 20 seconds.\n\nEach piece of Medium Armor worn removes and grants immunity to snares and immobilizations for 1 second.",
  icon: "/esoui/art/icons/ability_armor_002_a.dds",
  esoSkillId: 41131,
  isMorph: true,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/armor-medium-armor",
  skillType: "temper-skill-type/active",
  hashPlace: 1181,
  createdAt: "2026-05-26T02:59:07.661Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Evasion (Constant)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
