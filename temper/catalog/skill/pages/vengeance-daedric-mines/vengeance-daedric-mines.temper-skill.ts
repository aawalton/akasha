import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDaedricMines = {
  id: "019e6f53-a8e2-76cb-b62a-10fc81bb0b61",
  type: "page-type/temper-skill",
  slug: "vengeance-daedric-mines",
  title: "Vengeance Daedric Mines",
  key: "vengeance-daedric-mines",
  baseName: "Vengeance Daedric Mines",
  description:
    "Surprise your foes by detonating |cffffff3|r volatile Daedric mines around you, dealing |cffffff8820|r Magic Damage to up 3 enemies and reducing their movement speed by |cffffff30|r% for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_daedric_mines.dds",
  esoSkillId: 237812,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 1444,
  createdAt: "2026-05-28T16:03:34.242Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 (Constant)",
    "<<2>> = 7875 Magic Damage (Constant)",
    "<<3>> = 6 (Constant)",
    "<<4>> = 30% (Constant)",
    "<<5>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
