import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceImpalingShards = {
  id: "019e6f53-a927-7f53-a20c-5d874337e19f",
  type: "page-type/temper-skill",
  slug: "vengeance-impaling-shards",
  title: "Vengeance Impaling Shards",
  key: "vengeance-impaling-shards",
  baseName: "Vengeance Impaling Shards",
  description:
    "Conjure icy shards around you to skewer up to 3 enemies in the area, dealing |cffffff8820|r Frost Damage and immobilizing them for |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_warden_004.dds",
  esoSkillId: 238079,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 1492,
  createdAt: "2026-05-28T16:03:34.311Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 (Constant)",
    "<<2>> = 7875 Frost Damage (Constant)",
    "<<3>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
