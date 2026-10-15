import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const syrabaneSBoon = {
  id: "019e6f53-a813-7434-820d-560f9ca1a83a",
  type: "page-type/temper-skill",
  slug: "syrabane-s-boon",
  title: "Syrabane's Boon",
  key: "syrabane-s-boon",
  baseName: "Syrabane's Boon",
  description: "Increases your Max Magicka by |cffffff600|r.",
  icon: "/esoui/art/icons/ability_armor_004.dds",
  esoSkillId: 117968,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/racial-high-elf-skills",
  skillType: "temper-skill-type/passive",
  hashPlace: 1322,
  createdAt: "2026-05-28T16:03:34.035Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 600 (Constant)"],
} as const satisfies TemperSkill
