import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const carve = {
  id: "019e6226-00db-70e2-9f24-7231705479ee",
  type: "page-type/temper-skill",
  slug: "carve",
  title: "Carve",
  key: "carve",
  baseName: "Cleave",
  description:
    "Focus your strength into a mighty swing, dealing 1742 Bleed Damage to enemies in front of you, and causing them to bleed for an additional 2868 Bleed Damage over 12 seconds.  \n\nHitting a target that is already bleeding from this ability extends the duration by 10 seconds, up to a maximum of 32.\n\nYou also gain a damage shield that absorbs 1742 damage for 6 seconds.",
  icon: "/esoui/art/icons/ability_2handed_002_a.dds",
  esoSkillId: 39754,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 187,
  createdAt: "2026-05-26T02:38:38.299Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.81349 MaxPower (Ultimate, ratio = 10.50, Dmg, Bleed, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.128143 MaxStat + 1.34655 MaxPower - 16.0662 (Ultimate, ratio = 10.51, Dmg, Bleed, SingleTarget, DOT, 2s tick, R2 = 0.999994)",
    "<<3>> = 12 seconds (Constant)",
    "<<4>> = 10 (Constant)",
    "<<5>> = 32 (Constant)",
    "<<6>> = 0.0775051 MaxStat + 0.813513 MaxPower - 1.59094 (Ultimate, ratio = 10.50, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<7>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
