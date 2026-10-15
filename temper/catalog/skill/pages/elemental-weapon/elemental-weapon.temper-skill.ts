import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elementalWeapon = {
  id: "019e6238-c2b4-7a52-b035-eaa8d11bd62f",
  type: "page-type/temper-skill",
  slug: "elemental-weapon",
  title: "Elemental Weapon",
  key: "elemental-weapon",
  baseName: "Imbue Weapon",
  description:
    "Infuse your weapon with power, causing your next Light Attack used within 2 seconds to deal an additional 2160 Magic Damage and apply the Burning, Concussion, or Chill elemental status effect.\n\nIf the power is not consumed in time, you restore 1620 Magicka.",
  icon: "/esoui/art/icons/ability_psijic_003_a.dds",
  esoSkillId: 40103571,
  isMorph: true,
  learnedLevel: 3,
  lineRankNeeded: 3,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/active",
  hashPlace: 414,
  createdAt: "2026-05-26T02:59:07.572Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 0.0960763 MaxStat + 1.00798 MaxPower - 1.15761 (Ultimate, ratio = 10.49, Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
