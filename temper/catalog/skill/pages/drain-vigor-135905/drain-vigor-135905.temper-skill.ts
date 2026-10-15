import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const drainVigor135905 = {
  id: "019e6f53-a0ee-78e7-bdc1-08b0fa0c3daf",
  type: "page-type/temper-skill",
  slug: "drain-vigor-135905",
  title: "Drain Vigor",
  key: "drain-vigor-135905",
  baseName: "Vampiric Drain",
  description:
    "Siphon away your enemies' vitality, dealing |cffffff3028|r Magic Damage, healing you for |cffffff26|r% of your missing Health, and restoring |cffffff10|r% of your missing Stamina every |cffffff1|r second for |cffffff3|r seconds.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_u26_vampire_03_a.dds",
  esoSkillId: 135905,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 384,
  createdAt: "2026-05-28T16:03:32.206Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0387472 MaxStat + 0.407029 MaxPower - 1.95945 (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 25% (Constant)",
    "<<3>> = 7% (Constant)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
