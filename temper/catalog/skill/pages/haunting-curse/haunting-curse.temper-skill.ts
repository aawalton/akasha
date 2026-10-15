import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hauntingCurse = {
  id: "019e6245-a69d-7db0-9533-f957dc10828d",
  type: "page-type/temper-skill",
  slug: "haunting-curse",
  title: "Haunting Curse",
  key: "haunting-curse",
  baseName: "Daedric Curse",
  description:
    "Curse an enemy with a destructive rune, dealing 2999 Magic Damage to the target and all other nearby enemies after 3.5 seconds.\n\nThe curse will continue to haunt the enemy and explode a second time, dealing 2999 Magic Damage to the target and all other nearby enemies after an additional 8.5 seconds.\n\nYou can have only one Haunting Curse active at a time.",
  icon: "/esoui/art/icons/ability_sorcerer_velocious_curse.dds",
  esoSkillId: 30523,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 599,
  createdAt: "2026-05-26T03:13:12.349Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.133395 MaxStat + 1.40094 MaxPower - 2.47364 (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 3.5 seconds (Constant)",
    "<<3>> = 8.5 seconds (Constant)",
    "<<4>> = Haunting Curse (Constant)",
  ],
} as const satisfies TemperSkill
