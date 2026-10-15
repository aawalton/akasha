import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceWingBuffet = {
  id: "019e6f53-a9b4-764c-aef3-7ffdd13f9c4f",
  type: "page-type/temper-skill",
  slug: "vengeance-wing-buffet",
  title: "Vengeance Wing Buffet",
  key: "vengeance-wing-buffet",
  baseName: "Vengeance Wing Buffet",
  description:
    "Flex your scales, reducing your damage taken from projectiles by |cffffff50|r% for |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_008.dds",
  esoSkillId: 237639,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 1590,
  createdAt: "2026-05-28T16:03:34.452Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 50% (Constant)", "<<2>> = 6 seconds (Constant)"],
} as const satisfies TemperSkill
