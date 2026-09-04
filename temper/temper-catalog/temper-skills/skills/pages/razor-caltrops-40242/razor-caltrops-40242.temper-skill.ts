import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const razorCaltrops40242 = {
  id: "019e6f53-a5b7-75a2-9ad7-e4123389ac64",
  pageTypeSlug: "temper-skill",
  slug: "razor-caltrops-40242",
  title: "Razor Caltrops",
  key: "razor-caltrops-40242",
  baseName: "Caltrops",
  description:
    '"Hurl a ball of caltrops that scatter over the target area, dealing |cffffff978|r Physical Damage every |cffffff1|r second to enemies inside, and reducing their Movement Speed by |cffffff50|r%.\\n\\nEnemies who take damage from the caltrops have Major Breach applied to them, reducing their Physical and Spell Resistance by |cffffff5948|r for |cffffff4.1|r seconds."',
  icon: "/esoui/art/icons/ability_ava_001_b.dds",
  esoSkillId: 40242,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
