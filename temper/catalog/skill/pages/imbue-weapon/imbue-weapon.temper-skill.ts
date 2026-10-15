import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const imbueWeapon = {
  id: "019e6f53-a353-7d4e-b18e-aa361c43e328",
  type: "page-type/temper-skill",
  slug: "imbue-weapon",
  title: "Imbue Weapon",
  key: "imbue-weapon",
  baseName: "Imbue Weapon",
  description:
    "Infuse your weapon with power, causing your next Light Attack used within |cffffff2|r seconds to deal an additional |cffffff7269|r Physical Damage.\n\nIf the power is not consumed in time, you restore |cffffff1506|r Stamina.",
  icon: "/esoui/art/icons/ability_psijic_003.dds",
  esoSkillId: 103483,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/active",
  hashPlace: 662,
  createdAt: "2026-05-28T16:03:32.819Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 0.089876 MaxStat + 0.945392 MaxPower + 0.199768 (Ultimate, ratio = 10.52, Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
