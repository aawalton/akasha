import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDragonknightStandard = {
  id: "019e6f53-a8f5-7d0e-bad3-ea5c06f7fd5d",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-dragonknight-standard",
  title: "Vengeance Dragonknight Standard",
  key: "vengeance-dragonknight-standard",
  baseName: "Vengeance Dragonknight Standard",
  description:
    '"Call down a battle standard after |cffffff1|r second, dealing |cffffff17640|r Flame Damage to up to 3 enemies and applying Major Defile to them for |cffffff15|r seconds, reducing their healing received and damage shield strength by |cffffff12|r%."',
  icon: "/esoui/art/icons/ability_dragonknight_006.dds",
  esoSkillId: 237627,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-ardent-flame",
  skillType: "ultimate",
  subcategoryId: "vengeance-dragonknight-ardent-flame",
} as const satisfies TemperSkill
