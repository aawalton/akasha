import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const grippingShards86165 = {
  id: "019e6f53-a2b9-7ad7-95e1-4c4767176813",
  pageTypeSlug: "temper-skill",
  slug: "gripping-shards-86165",
  title: "Gripping Shards",
  key: "gripping-shards-86165",
  baseName: "Impaling Shards",
  description:
    '"Conjure icy shards around you to skewer enemies in the area, immobilizing them for |cffffff3|r seconds and dealing |cffffff548|r Frost Damage every |cffffff1|r second for |cffffff12|r seconds.\\n\\nEnemies hit are overcome with bitter cold, reducing their Movement Speed by |cffffff30|r% for |cffffff3|r seconds.\\n\\nDamage done is based on your Max Health and has a higher chance to apply the Chilled status effect."',
  icon: "/esoui/art/icons/ability_warden_004_a.dds",
  esoSkillId: 86165,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
