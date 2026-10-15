import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const radiantGlory63044 = {
  id: "019e6f53-a583-7223-a1fb-f7364bb5195b",
  type: "page-type/temper-skill",
  slug: "radiant-glory-63044",
  title: "Radiant Glory",
  key: "radiant-glory-63044",
  baseName: "Radiant Destruction",
  description:
    "Burn an enemy with a ray of holy fire, dealing |cffffff26028|r Magic Damage over |cffffff3.8|r seconds. Deals up to |cffffff500|r% more damage to enemies below |cffffff33|r% Health.\n\nYou heal for |cffffff15|r% of the damage inflicted.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_templar_under_exposure.dds",
  esoSkillId: 63044,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 961,
  createdAt: "2026-05-28T16:03:33.379Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05379 MaxStat + 0.563495 MaxPower - 1.09425 (Ultimate, ratio = 10.48, Dmg, Magic, SingleTarget, Direct, 3.5s duration, 0.7s tick, R2 = 0.999999)",
    "<<2>> = 3.8 seconds (Constant)",
    "<<3>> = 500 (Constant)",
    "<<4>> = 33 (Constant)",
    "<<5>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill
