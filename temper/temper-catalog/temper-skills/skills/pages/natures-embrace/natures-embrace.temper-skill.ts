import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const naturesEmbrace = {
  id: "019e6245-a6d7-701e-ac52-e1c880eb6320",
  pageTypeSlug: "temper-skill",
  slug: "natures-embrace",
  title: "Nature's Embrace",
  key: "natures-embrace",
  baseName: "Nature's Grasp",
  description:
    '"Launch a vine to swing yourself to an ally, healing you and them for 3594 Health over 10 seconds. Gain 3 Ultimate when either of these effects complete while you are in combat."',
  icon: "/esoui/art/icons/ability_warden_011_b.dds",
  esoSkillId: 93940,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
