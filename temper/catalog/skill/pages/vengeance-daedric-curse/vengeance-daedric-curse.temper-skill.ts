import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDaedricCurse = {
  id: "019e6f53-a8e0-7feb-bb73-f400a371d872",
  type: "page-type/temper-skill",
  slug: "vengeance-daedric-curse",
  title: "Vengeance Daedric Curse",
  key: "vengeance-daedric-curse",
  baseName: "Vengeance Daedric Curse",
  description:
    "Curse an enemy with a destructive rune, dealing |cffffff16027|r Magic Damage to the target after |cffffff6|r seconds.\n\nThis ability cannot be dodged.",
  icon: "/esoui/art/icons/ability_sorcerer_daedric_curse.dds",
  esoSkillId: 237876,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1443,
  createdAt: "2026-05-28T16:03:34.240Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 15120 Magic Damage (Constant)", "<<2>> = 6 seconds (Constant)"],
} as const satisfies TemperSkill
