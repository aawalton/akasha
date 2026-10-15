import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const powerSurge = {
  id: "019e6245-a6ec-7a49-af23-214d329b9ee3",
  type: "page-type/temper-skill",
  slug: "power-surge",
  title: "Power Surge",
  key: "power-surge",
  baseName: "Surge",
  description:
    "Invoke Meridia's name to gain Major Brutality and Major Sorcery, increasing your Weapon Damage and Spell Damage by 20% for 33 seconds.\n\nWhile active, activating a Critical heal causes the ability to heal you and your allies around you for 2550 Health. This effect can occur once every 3 seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_power_surge.dds",
  esoSkillId: 30396,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 919,
  createdAt: "2026-05-26T03:13:12.428Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20% (Constant)",
    "<<2>> = 33 seconds (Constant)",
    "<<3>> = 2550 (Constant)",
    "<<4>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
