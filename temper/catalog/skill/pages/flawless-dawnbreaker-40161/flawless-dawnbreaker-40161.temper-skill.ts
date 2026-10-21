import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const flawlessDawnbreaker40161 = {
  id: "019e6f53-a20c-72a1-97f6-e2b30b30309c",
  type: "page-type/temper-skill",
  slug: "flawless-dawnbreaker-40161",
  title: "Flawless Dawnbreaker",
  key: "flawless-dawnbreaker-40161",
  baseName: "Dawnbreaker",
  description:
    "Arm yourself with Meridia's sacred sword and dispense her retribution, dealing |cffffff10668|r Physical Damage to enemies in front of you and an additional |cffffff11427|r Physical Damage over |cffffff6|r seconds.\n\nAfter activating, your Weapon and Spell Damage is increased by |cffffff300|r for |cffffff20|r seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_005_a.dds",
  esoSkillId: 40161,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 1,
  rank: 10,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 517,
  createdAt: "2026-05-28T16:03:32.492Z",
  updatedAt: "2026-10-21T12:30:41.224Z",
  equations: [
    "<<1>> = 0.129125 MaxStat + 1.35581 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, Direct, Melee, 0.4s cooldown, R2 = 1, single precision, Fighters Guild)",
    "<<2>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, Dmg, Physical, SingleTarget, DOT, 4s duration, 2s tick, single precision, Fighters Guild)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 300 (Constant)",
    "<<5>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
