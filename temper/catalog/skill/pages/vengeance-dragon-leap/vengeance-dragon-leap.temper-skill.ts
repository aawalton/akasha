import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDragonLeap = {
  id: "019e6f53-a8f2-7e32-a85e-8e434514fa75",
  type: "page-type/temper-skill",
  slug: "vengeance-dragon-leap",
  title: "Vengeance Dragon Leap",
  key: "vengeance-dragon-leap",
  baseName: "Vengeance Dragon Leap",
  description:
    "Launch yourself at an enemy, dealing |cffffff20285|r Physical Damage to up to 3 enemies in the area.",
  icon: "/esoui/art/icons/ability_dragonknight_009.dds",
  esoSkillId: 237648,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-dragonknight-draconic-power",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1455,
  createdAt: "2026-05-28T16:03:34.258Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 18112 Physical Damage (Constant)", "<<2>> = 12 (Constant)"],
} as const satisfies TemperSkill
