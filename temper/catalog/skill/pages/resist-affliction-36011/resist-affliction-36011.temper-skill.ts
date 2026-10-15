import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const resistAffliction36011 = {
  id: "019e6f53-a60d-7b4d-9e21-e493c798fd36",
  type: "page-type/temper-skill",
  slug: "resist-affliction-36011",
  title: "Resist Affliction",
  key: "resist-affliction-36011",
  baseName: "Resist Affliction",
  description:
    "Increases your Max Stamina by |cffffff600|r and your Disease and Poison Resistance by |cffffff660|r.",
  icon: "/esoui/art/icons/passive_templar_021.dds",
  esoSkillId: 36011,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 25,
  morphIndex: 0,
  rank: 25,
  skillLineId: "temper-skill-line/racial-wood-elf-skills",
  skillType: "temper-skill-type/passive",
  hashPlace: 1035,
  createdAt: "2026-05-28T16:03:33.517Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 600 (Constant)", "<<2>> = 660 (Constant)"],
} as const satisfies TemperSkill
