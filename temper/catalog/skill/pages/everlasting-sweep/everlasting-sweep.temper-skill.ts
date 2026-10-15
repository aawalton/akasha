import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const everlastingSweep = {
  id: "019e6245-a675-7da9-ab6e-949740ab53d8",
  type: "page-type/temper-skill",
  slug: "everlasting-sweep",
  title: "Everlasting Sweep",
  key: "everlasting-sweep",
  baseName: "Radial Sweep",
  description:
    "Swing your Aedric spear around with holy vengeance, dealing 2399 Physical Damage to all nearby enemies and an additional 1161 Physical Damage every 2 seconds for 10 seconds. The duration is extended by 2 seconds for each enemy hit.",
  icon: "/esoui/art/icons/ability_templar_empowering_sweep.dds",
  esoSkillId: 23794,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 461,
  createdAt: "2026-05-26T03:13:12.309Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1067089 MaxStat + 1.12044345 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, AOE, Direct, Melee, 0.25s cooldown, R2 = 1)",
    "<<2>> = 0.05165 MaxStat + 0.54233 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, DOT, 2s tick, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
