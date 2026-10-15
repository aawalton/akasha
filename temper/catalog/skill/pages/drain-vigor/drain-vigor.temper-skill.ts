import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const drainVigor = {
  id: "019e6251-4caa-7bc4-be77-13ef22749d1a",
  type: "page-type/temper-skill",
  slug: "drain-vigor",
  title: "Drain Vigor",
  key: "drain-vigor",
  baseName: "Vampiric Drain",
  description:
    "Siphon away your enemies' vitality, dealing 870 Magic Damage, healing you for 25% of your missing Health, and restoring 10% of your missing Stamina every 1 second for 3 seconds.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_u26_vampire_03_a.dds",
  esoSkillId: 40135905,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 383,
  createdAt: "2026-05-26T03:25:55.754Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0387472 MaxStat + 0.407029 MaxPower - 1.95945 (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 25% (Constant)",
    "<<3>> = 10% (Constant)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
