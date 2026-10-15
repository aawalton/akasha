import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const radiantOppression63046 = {
  id: "019e6f53-a58c-7056-830f-d800808acd03",
  type: "page-type/temper-skill",
  slug: "radiant-oppression-63046",
  title: "Radiant Oppression",
  key: "radiant-oppression-63046",
  baseName: "Radiant Destruction",
  description:
    "Burn an enemy with a ray of holy fire, dealing |cffffff26028|r Magic Damage over |cffffff3.8|r seconds. Deals up to |cffffff500|r% more damage to enemies below |cffffff40|r% Health.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_templar_stendarr_aura.dds",
  esoSkillId: 63046,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 965,
  createdAt: "2026-05-28T16:03:33.388Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05379 MaxStat + 0.563495 MaxPower - 1.09425 (Ultimate, ratio = 10.48, Dmg, Magic, SingleTarget, Direct, 3.5s duration, 0.7s tick, R2 = 0.999999)",
    "<<2>> = 3.8 seconds (Constant)",
    "<<3>> = 500 (Constant)",
    "<<4>> = 40 (Constant)",
  ],
} as const satisfies TemperSkill
