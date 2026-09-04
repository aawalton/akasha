import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const winterSRevenge = {
  id: "019e6f53-a9f6-7ae8-978c-c6f46197a3c6",
  pageTypeSlug: "temper-skill",
  slug: "winter-s-revenge",
  title: "Winter's Revenge",
  key: "winter-s-revenge",
  baseName: "Impaling Shards",
  description:
    '"Conjure icy shards at the target location to skewer enemies in the area, dealing |cffffff1025|r Frost Damage every |cffffff1|r second for |cffffff12|r seconds. This damage increases by |cffffff30|r% if cast with a Destruction Staff equipped.\\n\\nEnemies hit are overcome with bitter cold, reducing their Movement Speed by |cffffff30|r% for |cffffff3|r seconds.\\n\\nThis ability has a higher chance to apply the Chilled status effect."',
  icon: "/esoui/art/icons/ability_warden_004_b.dds",
  esoSkillId: 86169,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
