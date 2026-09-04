import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalRage84434 = {
  id: "019e6f53-a11b-7e9a-802d-799f62c681c8",
  pageTypeSlug: "temper-skill",
  slug: "elemental-rage-84434",
  title: "Elemental Rage",
  key: "elemental-rage-84434",
  baseName: "Elemental Storm",
  description:
    '"Create a cataclysmic storm at the target location that builds for |cffffff2|r seconds then lays waste to all enemies in the area, dealing |cffffff7822|r Magic Damage every |cffffff1|r second for |cffffff7|r seconds.\\n\\nFiery Rage increases the damage by |cffffff15|r%.\\n\\nIcy Rage immobilizes enemies hit for |cffffff3|r seconds.\\n\\nThunderous Rage increases the duration by |cffffff2|r seconds."',
  icon: "/esoui/art/icons/ability_destructionstaff_012_b.dds",
  esoSkillId: 84434,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 50,
  skillLineId: "weapon-destruction-staff",
  skillType: "ultimate",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
