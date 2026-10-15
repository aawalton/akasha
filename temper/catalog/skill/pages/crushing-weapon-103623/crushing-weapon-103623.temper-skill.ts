import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const crushingWeapon103623 = {
  id: "019e6f53-a043-773e-acc6-290fcfe54cd3",
  type: "page-type/temper-skill",
  slug: "crushing-weapon-103623",
  title: "Crushing Weapon",
  key: "crushing-weapon-103623",
  baseName: "Imbue Weapon",
  description:
    "Infuse your weapon with power, causing your next Light Attack used within |cffffff2|r seconds to deal an additional |cffffff7509|r Physical Damage and applying Major Breach to the target, reducing their Physical and Spell Resistance by |cffffff5948|r for |cffffff5|r seconds.\n\nIf the power is not consumed in time, you restore |cffffff1506|r Stamina.",
  icon: "/esoui/art/icons/ability_psijic_003_b.dds",
  esoSkillId: 103623,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 2,
  rank: 3,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/active",
  hashPlace: 270,
  createdAt: "2026-05-28T16:03:32.035Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 0.0929455 MaxStat + 0.976197 MaxPower - 0.668374 (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = Major Breach (Constant)",
    "<<4>> = 5948 (Constant)",
    "<<5>> = 6 seconds (Constant)",
    "<<6>> = 8% (Constant)",
    "<<7>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
