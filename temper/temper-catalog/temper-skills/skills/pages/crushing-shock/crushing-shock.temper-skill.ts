import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const crushingShock = {
  id: "019e6226-00de-7523-bff2-1f6feb729813",
  pageTypeSlug: "temper-skill",
  slug: "crushing-shock",
  title: "Crushing Shock",
  key: "crushing-shock",
  baseName: "Force Shock",
  description:
    '"Focus all the elemental energies with your staff and blast an enemy for 696 Flame Damage, 696 Frost Damage, and 696 Shock Damage.\\n\\nEnemies hit while casting are interrupted, set Off Balance, and stunned for 3 seconds."',
  icon: "/esoui/art/icons/ability_destructionstaff_001a.dds",
  esoSkillId: 48971,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
