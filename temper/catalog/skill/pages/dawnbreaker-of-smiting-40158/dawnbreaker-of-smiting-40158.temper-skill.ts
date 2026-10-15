import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dawnbreakerOfSmiting40158 = {
  id: "019e6f53-a089-78e8-9c51-1c7c5e0a6e7f",
  type: "page-type/temper-skill",
  slug: "dawnbreaker-of-smiting-40158",
  title: "Dawnbreaker of Smiting",
  key: "dawnbreaker-of-smiting-40158",
  baseName: "Dawnbreaker",
  description:
    "Arm yourself with Meridia's sacred sword and dispense her retribution, dealing |cffffff13224|r Physical Damage to enemies in front of you, an additional |cffffff14163|r Physical Damage over |cffffff6|r seconds, and stunning them for |cffffff2|r seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_005_b.dds",
  esoSkillId: 40158,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 2,
  rank: 10,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 321,
  createdAt: "2026-05-28T16:03:32.105Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, AOE, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<2>> = 0.0620437 MaxStat + 0.650883 MaxPower - 2.37419 (Ultimate, ratio = 10.49, Dmg, Physical, SingleTarget, DOT, 4s duration, 2s tick, R2 = 1)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
