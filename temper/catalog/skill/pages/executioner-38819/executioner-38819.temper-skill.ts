import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const executioner38819 = {
  id: "019e6f53-a1ba-79c6-b9a1-fffdda5602c7",
  type: "page-type/temper-skill",
  slug: "executioner-38819",
  title: "Executioner",
  key: "executioner-38819",
  baseName: "Reverse Slash",
  description:
    "Shift your grip and cut deep, dealing |cffffff4038|r Bleed Damage to your foe. Deals up to |cffffff400|r% more damage to enemies with less than |cffffff50|r% Health.",
  icon: "/esoui/art/icons/ability_2handed_004_a.dds",
  esoSkillId: 38819,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 472,
  createdAt: "2026-05-28T16:03:32.410Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.54233 MaxPower (Ultimate, ratio = 10.50, Dmg, Bleed, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 385 (Constant)",
    "<<3>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
