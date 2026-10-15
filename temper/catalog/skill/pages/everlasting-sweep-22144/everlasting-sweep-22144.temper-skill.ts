import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const everlastingSweep22144 = {
  id: "019e6f53-a1ab-7dcb-9943-6e8216aaeb87",
  type: "page-type/temper-skill",
  slug: "everlasting-sweep-22144",
  title: "Everlasting Sweep",
  key: "everlasting-sweep-22144",
  baseName: "Radial Sweep",
  description:
    "Swing your Aedric spear around with holy vengeance, dealing |cffffff8814|r Physical Damage to all nearby enemies and an additional |cffffff4038|r Physical Damage every |cffffff2|r seconds for |cffffff10|r seconds. The duration is extended by |cffffff2|r seconds for each enemy hit.",
  icon: "/esoui/art/icons/ability_templar_empowering_sweep.dds",
  esoSkillId: 22144,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 462,
  createdAt: "2026-05-28T16:03:32.395Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, AOE, Direct, Melee, 0.25s cooldown, R2 = 1)",
    "<<2>> = 0.05165 MaxStat + 0.54233 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, DOT, 2s tick, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
