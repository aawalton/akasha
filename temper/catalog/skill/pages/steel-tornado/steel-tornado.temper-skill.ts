import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const steelTornado = {
  id: "019e6226-0117-7f46-ad86-52c3dc11544a",
  type: "page-type/temper-skill",
  slug: "steel-tornado",
  title: "Steel Tornado",
  key: "steel-tornado",
  baseName: "Whirlwind",
  description:
    "Launch yourself into a lethal spin, releasing a flurry of blades around you that deals 1742 Physical Damage to nearby enemies. Deals up to 33% more damage to enemies with less than 50% Health.",
  icon: "/esoui/art/icons/ability_dualwield_005_b.dds",
  esoSkillId: 40744,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 1271,
  createdAt: "2026-05-26T02:38:38.359Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077476 MaxStat + 0.81349 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 33 (Constant)",
    "<<3>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
