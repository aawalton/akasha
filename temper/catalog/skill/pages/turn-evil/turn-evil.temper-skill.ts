import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const turnEvil = {
  id: "019e6238-c327-799c-ba29-cfb6fc5be8fd",
  type: "page-type/temper-skill",
  slug: "turn-evil",
  title: "Turn Evil",
  key: "turn-evil",
  baseName: "Circle of Protection",
  description:
    "Brand the earth at your location with a rune of protection for 20 seconds. You and your allies in the area gain Minor Protection and Minor Endurance, reducing your damage taken by 5% and increasing your Stamina Recovery by 15%.\n\nUpon activation, enemies in the area are feared for 4 seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_001_a.dds",
  esoSkillId: 42529,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1369,
  createdAt: "2026-05-26T02:59:07.687Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = Minor Protection (Constant)",
    "<<3>> = Minor Endurance (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 15% (Constant)",
    "<<6>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
