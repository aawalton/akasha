import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const exhilaratingDrain137259 = {
  id: "019e6f53-a1c0-768c-a191-2f9596dbf9f2",
  type: "page-type/temper-skill",
  slug: "exhilarating-drain-137259",
  title: "Exhilarating Drain",
  key: "exhilarating-drain-137259",
  baseName: "Vampiric Drain",
  description:
    "Siphon away your enemies' vitality, dealing |cffffff3028|r Magic Damage, healing you for |cffffff26|r% of your missing Health, and generating |cffffff5|r Ultimate every |cffffff1|r second for |cffffff3|r seconds.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_u26_vampire_03_b.dds",
  esoSkillId: 137259,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 476,
  createdAt: "2026-05-28T16:03:32.416Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0387472 MaxStat + 0.407029 MaxPower - 1.95945 (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 25% (Constant)",
    "<<3>> = 2 (Constant)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
