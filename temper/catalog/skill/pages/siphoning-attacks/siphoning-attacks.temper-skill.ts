import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const siphoningAttacks = {
  id: "019e6245-a732-7743-a29d-03726e43c280",
  type: "page-type/temper-skill",
  slug: "siphoning-attacks",
  title: "Siphoning Attacks",
  key: "siphoning-attacks",
  baseName: "Siphoning Strikes",
  description:
    "Channel a portion of your soul to convert Health to 2600 Magicka and Stamina.\n\nWhile slotted on either bar, your soul yearns for the warmth of life. All damage you deal heals you for 1250 Health and restores 200 Magicka and Stamina, up to once every 1 second.",
  icon: "/esoui/art/icons/ability_nightblade_003_b.dds",
  esoSkillId: 38050,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1195,
  createdAt: "2026-05-26T03:13:12.498Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 2600 (Constant)",
    "<<2>> = 1250 (Constant)",
    "<<3>> = 200 (Constant)",
    "<<4>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
