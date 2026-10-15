import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hearthfire = {
  id: "019e6f53-a2fd-71ff-9e5c-fb2b99dcad3a",
  type: "page-type/temper-skill",
  slug: "hearthfire",
  title: "Hearthfire",
  key: "hearthfire",
  baseName: "Hearthfire",
  description:
    "Throw out a kindled flame, filling a large area with warmth for |cffffff15|r seconds. This fire heals you and your allies at the target location for |cffffff1369|r Health every |cffffff1|r second.\n\nHealed targets gain Minor Fortitude and Minor Heroism while inside, increasing Health Recovery by |cffffff15|r% and generating |cffffff1|r Ultimate every |cffffff1.5|r seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_016.dds",
  esoSkillId: 29059,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/dragonknight-ardent-flame",
  skillType: "temper-skill-type/active",
  hashPlace: 620,
  createdAt: "2026-05-28T16:03:32.733Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 15 seconds (Constant)",
    "<<2>> = 0.018763 MaxStat + 0.196719 MaxPower - 0.711896 (Ultimate, ratio = 10.48, Heal, AOE, Direct, 1s tick, R2 = 0.999991)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = Minor Fortitude (Constant)",
    "<<5>> = Minor Heroism (Constant)",
    "<<6>> = 15% (Constant)",
    "<<7>> = 1 (Constant)",
  ],
} as const satisfies TemperSkill
