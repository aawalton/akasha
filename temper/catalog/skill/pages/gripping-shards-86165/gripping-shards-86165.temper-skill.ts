import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const grippingShards86165 = {
  id: "019e6f53-a2b9-7ad7-95e1-4c4767176813",
  type: "page-type/temper-skill",
  slug: "gripping-shards-86165",
  title: "Gripping Shards",
  key: "gripping-shards-86165",
  baseName: "Impaling Shards",
  description:
    "Conjure icy shards around you to skewer enemies in the area, immobilizing them for |cffffff3|r seconds and dealing |cffffff548|r Frost Damage every |cffffff1|r second for |cffffff12|r seconds.\n\nEnemies hit are overcome with bitter cold, reducing their Movement Speed by |cffffff30|r% for |cffffff3|r seconds.\n\nDamage done is based on your Max Health and has a higher chance to apply the Chilled status effect.",
  icon: "/esoui/art/icons/ability_warden_004_a.dds",
  esoSkillId: 86165,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 583,
  createdAt: "2026-05-28T16:03:32.665Z",
  updatedAt: "2026-10-21T13:58:44.213Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.0254614 Health - 1.2414 (Health, Dmg, Frost, AOE, DOT, 1s tick, R2 = 0.999986, rank IV, single precision)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 12 seconds (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
