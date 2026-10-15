import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elude = {
  id: "019e6238-c2b5-78df-a869-e3412244cac4",
  type: "page-type/temper-skill",
  slug: "elude",
  title: "Elude",
  key: "elude",
  baseName: "Evasion",
  description:
    "Shroud yourself in mist to gain Major Evasion, reducing damage taken from area attacks by 20% for 16 seconds.\n\nWhile this effect is active, when you take damage from a direct area of effect attack you gain Major Expedition for 0 seconds, increasing your Movement Speed by 30%. \n\nEach piece of Medium Armor worn increases the duration of this ability.",
  icon: "/esoui/art/icons/ability_armor_002_b.dds",
  esoSkillId: 41137,
  isMorph: true,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/armor-medium-armor",
  skillType: "temper-skill-type/active",
  hashPlace: 416,
  createdAt: "2026-05-26T02:59:07.573Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Evasion (Constant)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 2 MediumArmor + 16 (Medium Armor, SingleTarget, Direct, R2 = 1)",
    "<<4>> = Major Expedition (Constant)",
    "<<5>> = 1 MediumArmor (Medium Armor, SingleTarget, Direct, R2 = 1)",
    "<<6>> = 30% (Constant)",
  ],
} as const satisfies TemperSkill
