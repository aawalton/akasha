import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDragonfireBreath = {
  id: "019e6f53-a8f4-7495-b62f-0e0e7751297a",
  type: "page-type/temper-skill",
  slug: "vengeance-dragonfire-breath",
  title: "Vengeance Dragonfire Breath",
  key: "vengeance-dragonfire-breath",
  baseName: "Vengeance Dragonfire Breath",
  description:
    "Exhale a flaming blast in front of you, dealing |cffffff8820|r Flame Damage to up to 3 enemies and an additional |cffffff7875|r Flame Damage over |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_004.dds",
  esoSkillId: 237615,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 1456,
  createdAt: "2026-05-28T16:03:34.260Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 7875 Flame Damage (Constant)",
    "<<2>> = 7875 Flame Damage (Constant)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
