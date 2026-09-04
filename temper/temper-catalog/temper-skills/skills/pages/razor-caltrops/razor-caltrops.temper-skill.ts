import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const razorCaltrops = {
  id: "019e6251-4cdb-7e0f-b379-0590451e9eed",
  pageTypeSlug: "temper-skill",
  slug: "razor-caltrops",
  title: "Razor Caltrops",
  key: "razor-caltrops",
  baseName: "Caltrops",
  description:
    '"Hurl a ball of caltrops that scatter over the target area, dealing 281 Physical Damage every 1 second to enemies inside, and reducing their Movement Speed by 50%.\\n\\nEnemies who take damage from the caltrops have Major Breach applied to them, reducing their Physical and Spell Resistance by 5948 for 4.1 seconds."',
  icon: "/esoui/art/icons/ability_ava_001_b.dds",
  esoSkillId: 46466,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
