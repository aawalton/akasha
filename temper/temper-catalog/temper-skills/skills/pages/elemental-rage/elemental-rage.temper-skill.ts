import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalRage = {
  id: "019e6226-00eb-774c-a896-2cd3fe5c868d",
  pageTypeSlug: "temper-skill",
  slug: "elemental-rage",
  title: "Elemental Rage",
  key: "elemental-rage",
  baseName: "Elemental Storm",
  description:
    '"Create a cataclysmic storm at the target location that builds for 2 seconds then lays waste to all enemies in the area, dealing 2249 Magic Damage every 1 second for 7 seconds.\\n\\nFiery Rage increases the damage by 15%.\\n\\nIcy Rage immobilizes enemies hit for 3 seconds.\\n\\nThunderous Rage increases the duration by 2 seconds."',
  icon: "/esoui/art/icons/ability_destructionstaff_012_b.dds",
  esoSkillId: 86510,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-destruction-staff",
  skillType: "ultimate",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
