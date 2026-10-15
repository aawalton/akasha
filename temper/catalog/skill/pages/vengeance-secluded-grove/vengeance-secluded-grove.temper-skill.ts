import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceSecludedGrove = {
  id: "019e6f53-a97d-7b57-9d6e-aa3acf647132",
  type: "page-type/temper-skill",
  slug: "vengeance-secluded-grove",
  title: "Vengeance Secluded Grove",
  key: "vengeance-secluded-grove",
  baseName: "Vengeance Secluded Grove",
  description:
    "Swell a healing forest at the target location, healing up to 3 of you and your allies for |cffffff42840|r Health over |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_warden_012.dds",
  esoSkillId: 238074,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-warden-green-balance",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1552,
  createdAt: "2026-05-28T16:03:34.397Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 6 (Constant)", "<<2>> = 42000 (Constant)", "<<3>> = 6 seconds (Constant)"],
} as const satisfies TemperSkill
