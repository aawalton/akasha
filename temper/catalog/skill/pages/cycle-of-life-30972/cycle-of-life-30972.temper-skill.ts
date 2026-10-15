import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const cycleOfLife30972 = {
  id: "019e6f53-a05d-7173-8876-adfd88adb012",
  type: "page-type/temper-skill",
  slug: "cycle-of-life-30972",
  title: "Cycle of Life",
  key: "cycle-of-life-30972",
  baseName: "Cycle of Life",
  description: "Your fully-charged Heavy Attacks restore |cffffff15|r% more Magicka.",
  icon: "/esoui/art/icons/ability_weapon_004.dds",
  esoSkillId: 30972,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 25,
  morphIndex: 0,
  rank: 25,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/passive",
  hashPlace: 289,
  createdAt: "2026-05-28T16:03:32.061Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 15% (Constant)"],
} as const satisfies TemperSkill
