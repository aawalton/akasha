import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vampireSBane = {
  id: "019e6f53-a8a1-7067-abcd-2fb4c471f908",
  type: "page-type/temper-skill",
  slug: "vampire-s-bane",
  title: "Vampire's Bane",
  key: "vampire-s-bane",
  baseName: "Sun Fire",
  description:
    "Blast an enemy with a charge of radiant heat, dealing |cffffff4038|r Flame Damage, and an additional |cffffff17685|r Flame Damage over |cffffff30|r seconds.\n\nUpon activation you gain Major Savagery and Major Prophecy for |cffffff30|r seconds, increasing your Weapon and Spell Critical rating by |cffffff2629|r.",
  icon: "/esoui/art/icons/ability_templar_vampire_bane.dds",
  esoSkillId: 21729,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 1400,
  createdAt: "2026-05-28T16:03:34.177Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0156088 MaxStat + 0.162726 MaxPower - 2.99951 (Ultimate, ratio = 10.43, Dmg, Flame, SingleTarget, DOT, 28s duration, 2s tick, R2 = 0.999995)",
    "<<3>> = 30 seconds (Constant)",
    "<<4>> = Major Savagery (Constant)",
    "<<5>> = 30 seconds (Constant)",
    "<<6>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill
