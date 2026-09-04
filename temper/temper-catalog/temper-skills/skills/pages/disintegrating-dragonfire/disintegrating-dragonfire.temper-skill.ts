import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const disintegratingDragonfire = {
  id: "019e6245-a659-76d8-85de-0915d28c4549",
  pageTypeSlug: "temper-skill",
  slug: "disintegrating-dragonfire",
  title: "Disintegrating Dragonfire",
  key: "disintegrating-dragonfire",
  baseName: "Dragonfire Breath",
  description:
    '"Exhale a blast of draconic fire in front of you, dealing 7148 Flame Damage, applying the Burning status effect, and an additional 10630 Flame Damage over 10 seconds to enemies in your path.\\n\\nThe initial hit liquifies the armor of your enemies, applying Major Breach to enemies for the duration, reducing Physical and Spell Resistance by 5948."',
  icon: "/esoui/art/icons/ability_dragonknight_004_a.dds",
  esoSkillId: 20944,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
