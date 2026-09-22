import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceLavaWhip = {
  id: "019e6f53-a92d-7aa7-83a7-9f3d74edd06f",
  type: "page-type/temper-skill",
  slug: "vengeance-lava-whip",
  title: "Vengeance Lava Whip",
  key: "vengeance-lava-whip",
  baseName: "Vengeance Lava Whip",
  description: '"Lash an enemy with flame, dealing |cffffff11130|r Flame Damage."',
  icon: "/esoui/art/icons/ability_dragonknight_001.dds",
  esoSkillId: 237606,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-dragonknight-ardent-flame",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
