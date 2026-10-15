import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const radialSweep = {
  id: "019e6f53-a57a-78fe-ad75-0e8bd707a36d",
  type: "page-type/temper-skill",
  slug: "radial-sweep",
  title: "Radial Sweep",
  key: "radial-sweep",
  baseName: "Radial Sweep",
  description:
    "Swing your Aedric spear around with holy vengeance, dealing |cffffff8533|r Magic Damage to all nearby enemies and an additional |cffffff4036|r Magic Damage every |cffffff2|r seconds for |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_templar_radial_sweep.dds",
  esoSkillId: 22138,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 956,
  createdAt: "2026-05-28T16:03:33.370Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, 0.25s cooldown, R2 = 1)",
    "<<2>> = 0.05 MaxStat + 0.525 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, DOT, 2s tick, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
