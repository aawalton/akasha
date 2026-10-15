import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const exhilaratingDrain = {
  id: "019e6251-4cb3-70e6-99d7-b86ffe736bf7",
  type: "page-type/temper-skill",
  slug: "exhilarating-drain",
  title: "Exhilarating Drain",
  key: "exhilarating-drain",
  baseName: "Vampiric Drain",
  description:
    "Siphon away your enemies' vitality, dealing 870 Magic Damage, healing you for 25% of your missing Health, and generating 5 Ultimate every 1 second for 3 seconds.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_u26_vampire_03_b.dds",
  esoSkillId: 40137259,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 475,
  createdAt: "2026-05-26T03:25:55.763Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0387472 MaxStat + 0.407029 MaxPower - 1.95945 (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 25% (Constant)",
    "<<3>> = 5 (Constant)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
