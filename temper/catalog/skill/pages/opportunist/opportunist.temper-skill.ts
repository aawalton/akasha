import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const opportunist = {
  id: "019e624a-12d2-7fb1-95af-3816031fbc1d",
  type: "page-type/temper-skill",
  slug: "opportunist",
  title: "Opportunist",
  key: "opportunist",
  baseName: "Opportunist",
  description:
    "Increases your experience gain with the Light Armor skill line by 15%.\n\nIncreases your Alliance Points gained by 1%.",
  icon: "/esoui/art/icons/ability_sorcerer_010.dds",
  esoSkillId: 36247,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/racial-breton-skills",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  hashPlace: 865,
  createdAt: "2026-05-26T03:18:02.194Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 1% (Constant)"],
} as const satisfies TemperSkill
