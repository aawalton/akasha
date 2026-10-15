import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const craftsman = {
  id: "019e624a-12c3-7616-9535-00bd1f608e54",
  type: "page-type/temper-skill",
  slug: "craftsman",
  title: "Craftsman",
  key: "craftsman",
  baseName: "Craftsman",
  description:
    "Increases your experience gain with the Heavy Armor skill line by 15%.\n\nIncreases your crafting inspiration gained by 10%.",
  icon: "/esoui/art/icons/ability_dragonknight_021.dds",
  esoSkillId: 33293,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/racial-orc-skills",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  hashPlace: 256,
  createdAt: "2026-05-26T03:18:02.179Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 10% (Constant)"],
} as const satisfies TemperSkill
