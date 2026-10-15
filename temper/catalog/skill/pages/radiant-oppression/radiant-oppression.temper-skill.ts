import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const radiantOppression = {
  id: "019e6245-a6fa-7259-b4ba-34500bcbac1a",
  type: "page-type/temper-skill",
  slug: "radiant-oppression",
  title: "Radiant Oppression",
  key: "radiant-oppression",
  baseName: "Radiant Destruction",
  description:
    "Burn an enemy with a ray of holy fire, dealing 7482 Magic Damage over 3.8 seconds. Deals up to 500% more damage to enemies below 40% Health.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_templar_stendarr_aura.dds",
  esoSkillId: 63075,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 964,
  createdAt: "2026-05-26T03:13:12.442Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0555178 MaxStat + 0.582438 MaxPower - 1.72443 (Ultimate, ratio = 10.49, Dmg, Magic, SingleTarget, Direct, 3.5s duration, 0.7s tick, R2 = 0.999999)",
    "<<2>> = 3.8 seconds (Constant)",
    "<<3>> = 500 (Constant)",
    "<<4>> = 40 (Constant)",
  ],
} as const satisfies TemperSkill
