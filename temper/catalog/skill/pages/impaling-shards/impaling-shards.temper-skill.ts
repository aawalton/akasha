import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const impalingShards = {
  id: "019e6f53-a35b-7535-8d38-8e625180c1ca",
  type: "page-type/temper-skill",
  slug: "impaling-shards",
  title: "Impaling Shards",
  key: "impaling-shards",
  baseName: "Impaling Shards",
  description:
    "Conjure icy shards around you to skewer enemies in the area, dealing |cffffff531|r Frost Damage every |cffffff1|r second for |cffffff12|r seconds.\n\nEnemies hit are overcome with bitter cold, reducing their Movement Speed by |cffffff30|r% for |cffffff3|r seconds.\n\nDamage done is based on your Max Health, and has a higher chance to apply the Chilled status effect.",
  icon: "/esoui/art/icons/ability_warden_004.dds",
  esoSkillId: 86161,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 667,
  createdAt: "2026-05-28T16:03:32.827Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0246459 Health - 1.14787 (Health, Dmg, Frost, AOE, DOT, 1s tick, R2 = 0.999986)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 12 seconds (Constant)",
    "<<4>> = 30% (Constant)",
    "<<5>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
