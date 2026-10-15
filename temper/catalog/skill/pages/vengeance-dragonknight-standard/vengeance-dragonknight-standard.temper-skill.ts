import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDragonknightStandard = {
  id: "019e6f53-a8f5-7d0e-bad3-ea5c06f7fd5d",
  type: "page-type/temper-skill",
  slug: "vengeance-dragonknight-standard",
  title: "Vengeance Dragonknight Standard",
  key: "vengeance-dragonknight-standard",
  baseName: "Vengeance Dragonknight Standard",
  description:
    "Call down a battle standard after |cffffff1|r second, dealing |cffffff17640|r Flame Damage to up to 3 enemies and applying Major Defile to them for |cffffff15|r seconds, reducing their healing received and damage shield strength by |cffffff12|r%.",
  icon: "/esoui/art/icons/ability_dragonknight_006.dds",
  esoSkillId: 237627,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-dragonknight-ardent-flame",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1457,
  createdAt: "2026-05-28T16:03:34.261Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1 second (Constant)",
    "<<2>> = 15750 Flame Damage (Constant)",
    "<<3>> = 15 seconds (Constant)",
    "<<4>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill
