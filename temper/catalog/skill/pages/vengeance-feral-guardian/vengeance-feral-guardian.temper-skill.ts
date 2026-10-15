import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceFeralGuardian = {
  id: "019e6f53-a90b-70b4-8531-b5b493a031b0",
  type: "page-type/temper-skill",
  slug: "vengeance-feral-guardian",
  title: "Vengeance Feral Guardian",
  key: "vengeance-feral-guardian",
  baseName: "Vengeance Feral Guardian",
  description:
    "Rouse a grizzly to maul an enemy for |cffffff15582|r Magic Damage. Deals |cffffff100|r% more damage to enemies below |cffffff25|r% Health.",
  icon: "/esoui/art/icons/ability_warden_018.dds",
  esoSkillId: 238043,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-warden-animal-companions",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1472,
  createdAt: "2026-05-28T16:03:34.283Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 14700 Magic Damage (Constant)",
    "<<2>> = 100 (Constant)",
    "<<3>> = 25 (Constant)",
  ],
} as const satisfies TemperSkill
