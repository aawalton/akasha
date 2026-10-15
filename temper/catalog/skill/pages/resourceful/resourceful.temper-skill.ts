import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const resourceful = {
  id: "019e624a-12d9-79f1-9c01-3fe8bf8d527a",
  type: "page-type/temper-skill",
  slug: "resourceful",
  title: "Resourceful",
  key: "resourceful",
  baseName: "Resourceful",
  description:
    "Increases your Max Magicka and Max Stamina by 1000.\n\nWhen you drink a potion, you restore 3125 Health, Magicka, and Stamina.",
  icon: "/esoui/art/icons/ability_templar_009.dds",
  esoSkillId: 45247,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/racial-argonian-skills",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
  hashPlace: 1047,
  createdAt: "2026-05-26T03:18:02.201Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 1000 (Constant)", "<<2>> = 3125 (Constant)"],
} as const satisfies TemperSkill
