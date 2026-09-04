import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const wintersRevenge = {
  id: "019e6245-a76d-72c0-9690-e3356b0cd1f1",
  pageTypeSlug: "temper-skill",
  slug: "winters-revenge",
  title: "Winter's Revenge",
  key: "winters-revenge",
  baseName: "Impaling Shards",
  description:
    '"Conjure icy shards at the target location to skewer enemies in the area, dealing 294 Frost Damage every 1 second for 12 seconds. This damage increases by 30% if cast with a Destruction Staff equipped.\\n\\nEnemies hit are overcome with bitter cold, reducing their Movement Speed by 30% for 3 seconds.\\n\\nThis ability has a higher chance to apply the Chilled status effect."',
  icon: "/esoui/art/icons/ability_warden_004_b.dds",
  esoSkillId: 86172,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
