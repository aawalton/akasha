import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dragonfireBreath = {
  id: "019e6f53-a0e6-7f97-8dbb-977c423edba3",
  type: "page-type/temper-skill",
  slug: "dragonfire-breath",
  title: "Dragonfire Breath",
  key: "dragonfire-breath",
  baseName: "Dragonfire Breath",
  description:
    '"Exhale a blast of draconic fire in front of you, dealing |cffffff6400|r Flame Damage and an additional |cffffff9515|r Flame Damage over |cffffff10|r seconds to enemies in your path."',
  icon: "/esoui/art/icons/ability_dragonknight_004.dds",
  esoSkillId: 20917,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
