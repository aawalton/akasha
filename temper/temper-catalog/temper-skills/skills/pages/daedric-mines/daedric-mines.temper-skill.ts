import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const daedricMines = {
  id: "019e6f53-a05f-75ae-a14f-5b8cc77c87c5",
  pageTypeSlug: "temper-skill",
  slug: "daedric-mines",
  title: "Daedric Mines",
  key: "daedric-mines",
  baseName: "Daedric Mines",
  description:
    '"Surprise your foes by placing |cffffff3|r volatile Daedric mines around you, which take |cffffff3|r seconds to arm and last for |cffffff15|r seconds.\\n\\nWhen a mine is triggered it explodes, dealing |cffffff9086|r Magic Damage and immobilizing the enemy for |cffffff2|r seconds. Enemies can only be damaged by your mines once every |cffffff2|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_daedric_mines.dds",
  esoSkillId: 24828,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
