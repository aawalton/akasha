import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const crescentSweep22139 = {
  id: "019e6f53-a030-77ed-9b2d-6313550ad5b3",
  type: "page-type/temper-skill",
  slug: "crescent-sweep-22139",
  title: "Crescent Sweep",
  key: "crescent-sweep-22139",
  baseName: "Radial Sweep",
  description:
    "Swing your Aedric spear around with holy vengeance, dealing |cffffff8814|r Magic Damage to all nearby enemies and an additional |cffffff4038|r Magic Damage every |cffffff2|r seconds for |cffffff6|r seconds.\n\nEnemies in your path will be hit for |cffffff60|r% more damage.",
  icon: "/esoui/art/icons/ability_templar_crescent_sweep.dds",
  esoSkillId: 22139,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 258,
  createdAt: "2026-05-28T16:03:32.016Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, 0.25s cooldown, R2 = 1)",
    "<<2>> = 0.05165 MaxStat + 0.54233 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, DOT, 2s tick, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 6 seconds (Constant)",
    "<<5>> = 60% (Constant)",
  ],
} as const satisfies TemperSkill
