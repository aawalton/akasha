import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulSplittingTrap = {
  id: "019e6251-4cef-738f-ba89-949740bd9a44",
  type: "page-type/temper-skill",
  slug: "soul-splitting-trap",
  title: "Soul Splitting Trap",
  key: "soul-splitting-trap",
  baseName: "Soul Trap",
  description:
    "Lay claim to enemy souls, dealing 2316 Magic Damage to your target and any other nearby enemies over 10 seconds.\n\nFills an empty Soul Gem if an affected enemy dies.",
  icon: "/esoui/art/icons/ability_otherclass_001_a.dds",
  esoSkillId: 43067,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 1234,
  createdAt: "2026-05-26T03:25:55.823Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0172105 MaxStat + 0.181103 MaxPower - 1.45945 (Ultimate, ratio = 10.52, Dmg, Magic, SingleTarget, DOT, 10s duration, 2s tick, R2 = 0.999996)",
    "<<2>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
