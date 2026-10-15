import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const carve38745 = {
  id: "019e6f53-9fb9-7aac-a861-ef2b52754b07",
  type: "page-type/temper-skill",
  slug: "carve-38745",
  title: "Carve",
  key: "carve-38745",
  baseName: "Cleave",
  description:
    "Focus your strength into a mighty swing, dealing |cffffff6401|r Bleed Damage to enemies in front of you, and causing them to bleed for an additional |cffffff9438|r Bleed Damage over |cffffff12|r seconds.  \n\nHitting a target that is already bleeding from this ability extends the duration by |cffffff10|r seconds, up to a maximum of |cffffff32|r.\n\nYou also gain a damage shield that absorbs |cffffff6178|r damage for |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_2handed_002_a.dds",
  esoSkillId: 38745,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 14,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 188,
  createdAt: "2026-05-28T16:03:31.897Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.81349 MaxPower (Ultimate, ratio = 10.50, Dmg, Bleed, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.123925 MaxStat + 1.30381 MaxPower - 11.7219 (Ultimate, ratio = 10.52, Dmg, Bleed, SingleTarget, DOT, 2s tick, R2 = 0.999996)",
    "<<3>> = 12 seconds (Constant)",
    "<<4>> = 10 (Constant)",
    "<<5>> = 32 (Constant)",
    "<<6>> = 0.0775051 MaxStat + 0.813513 MaxPower - 1.59094 (Ultimate, ratio = 10.50, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<7>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
