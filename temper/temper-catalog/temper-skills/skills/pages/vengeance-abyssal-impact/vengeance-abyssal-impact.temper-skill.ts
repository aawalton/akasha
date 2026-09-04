import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceAbyssalImpact = {
  id: "019e6f53-a8ac-7e51-8d47-689fea1822f1",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-abyssal-impact",
  title: "Vengeance Abyssal Impact",
  key: "vengeance-abyssal-impact",
  baseName: "Vengeance Abyssal Impact",
  description:
    '"Infuse your arm with abyssal magic to form tentacles that lash out at your foes, dealing |cffffff10143|r Physical Damage to up to 3 enemies and immobilize them for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_arcanist_003.dds",
  esoSkillId: 238189,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
