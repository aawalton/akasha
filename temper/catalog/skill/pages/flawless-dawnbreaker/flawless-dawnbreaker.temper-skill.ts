import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const flawlessDawnbreaker = {
  id: "019e6238-c2be-7645-9879-1e8410f84b17",
  type: "page-type/temper-skill",
  slug: "flawless-dawnbreaker",
  title: "Flawless Dawnbreaker",
  key: "flawless-dawnbreaker",
  baseName: "Dawnbreaker",
  description:
    "Arm yourself with Meridia's sacred sword and dispense her retribution, dealing 2904 Physical Damage to enemies in front of you and an additional 3483 Physical Damage over 6 seconds.\n\nAfter activating, your Weapon and Spell Damage is increased by 300 for 20 seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_005_a.dds",
  esoSkillId: 42586,
  isMorph: true,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 516,
  createdAt: "2026-05-26T02:59:07.582Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.129125 MaxStat + 1.35581 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<2>> = 0.051612 MaxStat + 0.542543 MaxPower - 0.879853 (Ultimate, ratio = 10.51, Dmg, Physical, SingleTarget, DOT, 4s duration, 2s tick, R2 = 1)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 300 (Constant)",
    "<<5>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
