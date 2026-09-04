import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDragonfireBreath = {
  id: "019e6f53-a8f4-7495-b62f-0e0e7751297a",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-dragonfire-breath",
  title: "Vengeance Dragonfire Breath",
  key: "vengeance-dragonfire-breath",
  baseName: "Vengeance Dragonfire Breath",
  description:
    '"Exhale a flaming blast in front of you, dealing |cffffff8820|r Flame Damage to up to 3 enemies and an additional |cffffff7875|r Flame Damage over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_004.dds",
  esoSkillId: 237615,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-draconic-power",
} as const satisfies TemperSkill
