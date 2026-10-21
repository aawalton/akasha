import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const killerSBlade = {
  id: "019e6f53-a3b3-7ed1-990d-da3e9070e9e5",
  type: "page-type/temper-skill",
  slug: "killer-s-blade",
  title: "Killer's Blade",
  key: "killer-s-blade",
  baseName: "Assassin's Blade",
  description:
    "Thrust a caustic blade with lethal precision to stab an enemy, dealing |cffffff4038|r Disease Damage. Deals up to |cffffff400|r% more damage to enemies with less than |cffffff50|r% Health.\n\nHeals you for |cffffff7547|r if the enemy dies within |cffffff2|r seconds of being struck.",
  icon: "/esoui/art/icons/ability_nightblade_017_a.dds",
  esoSkillId: 34843,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 721,
  createdAt: "2026-05-28T16:03:32.915Z",
  updatedAt: "2026-10-21T03:53:31.433Z",
  equations: [
    "<<1>> = 0.051642912 MaxStat + 0.54225058 MaxPower (Ultimate, Dmg, Disease, SingleTarget, Direct, Melee)",
    "<<2>> = 400 (Constant)",
    "<<3>> = 50 (Constant)",
    "<<4>> = 0.10323 MaxStat + 1.08494 MaxPower - 0.77399 (Ultimate, ratio = 10.51, Heal, SingleTarget, Direct, R2 = 1)",
    "<<5>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
