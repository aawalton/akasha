import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const grippingShards = {
  id: "019e6245-a698-7c99-bc55-fbebf7db1e14",
  type: "page-type/temper-skill",
  slug: "gripping-shards",
  title: "Gripping Shards",
  key: "gripping-shards",
  baseName: "Impaling Shards",
  description:
    "Conjure icy shards around you to skewer enemies in the area, immobilizing them for 3 seconds and dealing 419 Frost Damage every 1 second for 12 seconds.\n\nEnemies hit are overcome with bitter cold, reducing their Movement Speed by 30% for 3 seconds.\n\nDamage done is based on your Max Health and has a higher chance to apply the Chilled status effect.",
  icon: "/esoui/art/icons/ability_warden_004_a.dds",
  esoSkillId: 86168,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 582,
  createdAt: "2026-05-26T03:13:12.344Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.0262943 Health - 1.59107 (Health, Dmg, Frost, AOE, DOT, 1s tick, R2 = 0.999972)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 12 seconds (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
