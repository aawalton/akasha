import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vampiricDrain = {
  id: "019e6f53-a8a4-77d0-803c-29c9145c0939",
  type: "page-type/temper-skill",
  slug: "vampiric-drain",
  title: "Vampiric Drain",
  key: "vampiric-drain",
  baseName: "Vampiric Drain",
  description:
    "Siphon away your enemies' vitality, dealing |cffffff3028|r Magic Damage and healing you for |cffffff26|r% of your missing Health every |cffffff1|r second for |cffffff3|r seconds.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_u26_vampire_03.dds",
  esoSkillId: 134583,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 1402,
  createdAt: "2026-05-28T16:03:34.180Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0374406 MaxStat + 0.393892 MaxPower - 0.180971 (Ultimate, ratio = 10.52, Dmg, Magic, SingleTarget, Direct, R2 = 0.999999)",
    "<<2>> = 25% (Constant)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
