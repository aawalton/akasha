import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const whirlingBlades = {
  id: "019e6226-0120-76bc-abdb-dd80abc8eda1",
  type: "page-type/temper-skill",
  slug: "whirling-blades",
  title: "Whirling Blades",
  key: "whirling-blades",
  baseName: "Whirlwind",
  description:
    "Launch yourself into a lethal spin, dealing 1799 Physical Damage to nearby enemies. Deals up to 100% more damage to enemies with less than 50% Health.",
  icon: "/esoui/art/icons/ability_dualwield_005_a.dds",
  esoSkillId: 40731,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 1616,
  createdAt: "2026-05-26T02:38:38.368Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.080032708 MaxStat + 0.84033517 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 100 (Constant)",
    "<<3>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
