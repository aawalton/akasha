import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const daedricTomb24842 = {
  id: "019e6f53-a06a-777c-b8df-1196f63600b3",
  pageTypeSlug: "temper-skill",
  slug: "daedric-tomb-24842",
  title: "Daedric Tomb",
  key: "daedric-tomb-24842",
  baseName: "Daedric Mines",
  description:
    '"Surprise your foes by placing |cffffff3|r volatile Daedric mines at a target location, which arm instantly and last for |cffffff15|r seconds.\\n\\nWhen a mine is triggered it explodes, dealing |cffffff9385|r Magic Damage and immobilizing the enemy for |cffffff2|r seconds. Enemies can only be damaged by your mines once every |cffffff2|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_daedric_tomb.dds",
  esoSkillId: 24842,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
