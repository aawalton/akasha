import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const wintersRevenge = {
  id: "019e6245-a76d-72c0-9690-e3356b0cd1f1",
  type: "page-type/temper-skill",
  slug: "winters-revenge",
  title: "Winter's Revenge",
  key: "winters-revenge",
  baseName: "Impaling Shards",
  description:
    "Conjure icy shards at the target location to skewer enemies in the area, dealing 294 Frost Damage every 1 second for 12 seconds. This damage increases by 30% if cast with a Destruction Staff equipped.\n\nEnemies hit are overcome with bitter cold, reducing their Movement Speed by 30% for 3 seconds.\n\nThis ability has a higher chance to apply the Chilled status effect.",
  icon: "/esoui/art/icons/ability_warden_004_b.dds",
  esoSkillId: 86172,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 1624,
  createdAt: "2026-05-26T03:13:12.557Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0129781 MaxStat + 0.138056 MaxPower + 0.295763 (Ultimate, ratio = 10.64, Dmg, Frost, AOE, DOT, 1s tick, R2 = 0.999991)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 12 seconds (Constant)",
    "<<4>> = 30% (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
