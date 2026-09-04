import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const impalingShards = {
  id: "019e6f53-a35b-7535-8d38-8e625180c1ca",
  pageTypeSlug: "temper-skill",
  slug: "impaling-shards",
  title: "Impaling Shards",
  key: "impaling-shards",
  baseName: "Impaling Shards",
  description:
    '"Conjure icy shards around you to skewer enemies in the area, dealing |cffffff531|r Frost Damage every |cffffff1|r second for |cffffff12|r seconds.\\n\\nEnemies hit are overcome with bitter cold, reducing their Movement Speed by |cffffff30|r% for |cffffff3|r seconds.\\n\\nDamage done is based on your Max Health, and has a higher chance to apply the Chilled status effect."',
  icon: "/esoui/art/icons/ability_warden_004.dds",
  esoSkillId: 86161,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
