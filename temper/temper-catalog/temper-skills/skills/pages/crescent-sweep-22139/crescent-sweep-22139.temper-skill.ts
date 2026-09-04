import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crescentSweep22139 = {
  id: "019e6f53-a030-77ed-9b2d-6313550ad5b3",
  pageTypeSlug: "temper-skill",
  slug: "crescent-sweep-22139",
  title: "Crescent Sweep",
  key: "crescent-sweep-22139",
  baseName: "Radial Sweep",
  description:
    '"Swing your Aedric spear around with holy vengeance, dealing |cffffff8814|r Magic Damage to all nearby enemies and an additional |cffffff4038|r Magic Damage every |cffffff2|r seconds for |cffffff6|r seconds.\\n\\nEnemies in your path will be hit for |cffffff60|r% more damage."',
  icon: "/esoui/art/icons/ability_templar_crescent_sweep.dds",
  esoSkillId: 22139,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-aedric-spear",
  skillType: "ultimate",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
