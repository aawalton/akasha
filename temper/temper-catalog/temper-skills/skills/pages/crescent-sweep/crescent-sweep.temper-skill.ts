import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crescentSweep = {
  id: "019e6245-a624-7604-86c1-b7663c07e9f3",
  pageTypeSlug: "temper-skill",
  slug: "crescent-sweep",
  title: "Crescent Sweep",
  key: "crescent-sweep",
  baseName: "Radial Sweep",
  description:
    '"Swing your Aedric spear around with holy vengeance, dealing 2399 Magic Damage to all nearby enemies and an additional 1161 Magic Damage every 2 seconds for 6 seconds.\\n\\nEnemies in your path will be hit for 60% more damage."',
  icon: "/esoui/art/icons/ability_templar_crescent_sweep.dds",
  esoSkillId: 23788,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-aedric-spear",
  skillType: "ultimate",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
