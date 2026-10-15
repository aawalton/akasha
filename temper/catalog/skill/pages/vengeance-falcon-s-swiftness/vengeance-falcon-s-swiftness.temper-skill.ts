import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceFalconSSwiftness = {
  id: "019e6f53-a906-7c75-92b7-ef22930d42fc",
  type: "page-type/temper-skill",
  slug: "vengeance-falcon-s-swiftness",
  title: "Vengeance Falcon's Swiftness",
  key: "vengeance-falcon-s-swiftness",
  baseName: "Vengeance Falcon's Swiftness",
  description:
    "Invoke the spirit of agility to gain Major Expedition for |cffffff6|r seconds, increasing your Movement Speed by |cffffff30|r%.",
  icon: "/esoui/art/icons/ability_warden_016.dds",
  esoSkillId: 238027,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 1469,
  createdAt: "2026-05-28T16:03:34.278Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 6 seconds (Constant)", "<<2>> = 30% (Constant)"],
} as const satisfies TemperSkill
