import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const crescentSweep = {
  id: "019e6245-a624-7604-86c1-b7663c07e9f3",
  type: "page-type/temper-skill",
  slug: "crescent-sweep",
  title: "Crescent Sweep",
  key: "crescent-sweep",
  baseName: "Radial Sweep",
  description:
    "Swing your Aedric spear around with holy vengeance, dealing 2399 Magic Damage to all nearby enemies and an additional 1161 Magic Damage every 2 seconds for 6 seconds.\n\nEnemies in your path will be hit for 60% more damage.",
  icon: "/esoui/art/icons/ability_templar_crescent_sweep.dds",
  esoSkillId: 23788,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 257,
  createdAt: "2026-05-26T03:13:12.228Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1067089 MaxStat + 1.12044345 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, Direct, Melee, 0.25s cooldown, R2 = 1)",
    "<<2>> = 0.05165 MaxStat + 0.54233 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, DOT, 2s tick, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 6 seconds (Constant)",
    "<<5>> = 60% (Constant)",
  ],
} as const satisfies TemperSkill
