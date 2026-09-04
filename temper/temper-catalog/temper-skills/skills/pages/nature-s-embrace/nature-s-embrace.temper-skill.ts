import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const natureSEmbrace = {
  id: "019e6f53-a4ac-7de0-b0b0-62f5f33d3947",
  pageTypeSlug: "temper-skill",
  slug: "nature-s-embrace",
  title: "Nature's Embrace",
  key: "nature-s-embrace",
  baseName: "Nature's Grasp",
  description:
    '"Launch a vine to swing yourself to an ally, healing you and them for |cffffff11316|r Health over |cffffff10|r seconds. Gain |cffffff3|r Ultimate when either of these effects complete while you are in combat."',
  icon: "/esoui/art/icons/ability_warden_011_b.dds",
  esoSkillId: 85858,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
