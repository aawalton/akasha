import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const undeath33093 = {
  id: "019e6f53-a880-71be-9894-03f066a428e6",
  type: "page-type/temper-skill",
  slug: "undeath-33093",
  title: "Undeath",
  key: "undeath-33093",
  baseName: "Undeath",
  description:
    "Reduces your damage taken by up to |cffffff7|r% based on your missing Health.\n\nCurrent bonus: |cffffff1|r%",
  icon: "/esoui/art/icons/passive_u26_vampire_03.dds",
  esoSkillId: 33093,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/passive",
  hashPlace: 1383,
  createdAt: "2026-05-28T16:03:34.144Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 7% (Constant)",
    "<<2>> = 0.0001315 Health - 1.1896 (Health, SingleTarget, Direct, R2 = 0.5958)",
  ],
} as const satisfies TemperSkill
