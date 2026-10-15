import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dawnbreakerOfSmiting = {
  id: "019e6238-c2b0-75c0-878f-8421daaec9a2",
  type: "page-type/temper-skill",
  slug: "dawnbreaker-of-smiting",
  title: "Dawnbreaker of Smiting",
  key: "dawnbreaker-of-smiting",
  baseName: "Dawnbreaker",
  description:
    "Arm yourself with Meridia's sacred sword and dispense her retribution, dealing 3600 Physical Damage to enemies in front of you, an additional 4314 Physical Damage over 6 seconds, and stunning them for 2 seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_005_b.dds",
  esoSkillId: 42598,
  isMorph: true,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 320,
  createdAt: "2026-05-26T02:59:07.568Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.16006335 MaxStat + 1.68067034 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, AOE, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<2>> = 0.0640613 MaxStat + 0.672577 MaxPower - 3.1811 (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, DOT, 4s duration, 2s tick, R2 = 0.999999)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
