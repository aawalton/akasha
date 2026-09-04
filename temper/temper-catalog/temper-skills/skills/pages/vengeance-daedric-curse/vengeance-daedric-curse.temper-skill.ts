import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDaedricCurse = {
  id: "019e6f53-a8e0-7feb-bb73-f400a371d872",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-daedric-curse",
  title: "Vengeance Daedric Curse",
  key: "vengeance-daedric-curse",
  baseName: "Vengeance Daedric Curse",
  description:
    '"Curse an enemy with a destructive rune, dealing |cffffff16027|r Magic Damage to the target after |cffffff6|r seconds.\\n\\nThis ability cannot be dodged."',
  icon: "/esoui/art/icons/ability_sorcerer_daedric_curse.dds",
  esoSkillId: 237876,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-daedric-summoning",
} as const satisfies TemperSkill
