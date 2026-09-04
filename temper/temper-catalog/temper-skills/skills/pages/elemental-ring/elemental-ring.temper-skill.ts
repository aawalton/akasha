import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalRing = {
  id: "019e6226-00ec-73ec-921a-633260519be7",
  pageTypeSlug: "temper-skill",
  slug: "elemental-ring",
  title: "Elemental Ring",
  key: "elemental-ring",
  baseName: "Impulse",
  description:
    '"Release a surge of elemental energy, dealing 1799 Magic Damage to enemies at the target location.\\n\\nFire Ring hits Burning enemies with Ring Afterburn, which deals more damage based on their missing Health.\\n\\nFrost Ring also provides Minor Protection.\\n\\nShock Ring\'s damage increases based on the number of enemies hit."',
  icon: "/esoui/art/icons/ability_destructionstaff_008_a.dds",
  esoSkillId: 42975,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
