import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const undauntedCommand = {
  id: "019e6238-c328-78c6-9ff4-12421f8ce619",
  type: "page-type/temper-skill",
  slug: "undaunted-command",
  title: "Undaunted Command",
  key: "undaunted-command",
  baseName: "Undaunted Command",
  description:
    "Activating a synergy restores 4% of your Max Health, Stamina, and Magicka.\n\nCurrent Bonus: 640 Health, 480 Stamina, and 480 Magicka.",
  icon: "/esoui/art/icons/ability_templar_003.dds",
  esoSkillId: 55676,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 1378,
  createdAt: "2026-05-26T02:59:07.688Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.04 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.04 Stamina (Stamina, SingleTarget, Direct, R2 = 1)",
    "<<3>> = 0.04 Magicka (Magicka, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
