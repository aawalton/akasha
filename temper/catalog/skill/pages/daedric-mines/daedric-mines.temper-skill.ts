import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const daedricMines = {
  id: "019e6f53-a05f-75ae-a14f-5b8cc77c87c5",
  type: "page-type/temper-skill",
  slug: "daedric-mines",
  title: "Daedric Mines",
  key: "daedric-mines",
  baseName: "Daedric Mines",
  description:
    "Surprise your foes by placing |cffffff3|r volatile Daedric mines around you, which take |cffffff3|r seconds to arm and last for |cffffff15|r seconds.\n\nWhen a mine is triggered it explodes, dealing |cffffff9086|r Magic Damage and immobilizing the enemy for |cffffff2|r seconds. Enemies can only be damaged by your mines once every |cffffff2|r seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_daedric_mines.dds",
  esoSkillId: 24828,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 291,
  createdAt: "2026-05-28T16:03:32.063Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 15 seconds (Constant)",
    "<<2>> = 0.112438 MaxStat + 1.18168 MaxPower - 0.92615 (Ultimate, ratio = 10.51, Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
