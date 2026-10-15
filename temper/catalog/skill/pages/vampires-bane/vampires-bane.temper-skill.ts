import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vampiresBane = {
  id: "019e6245-a75e-7be4-8bee-fe77af884d08",
  type: "page-type/temper-skill",
  slug: "vampires-bane",
  title: "Vampire's Bane",
  key: "vampires-bane",
  baseName: "Sun Fire",
  description:
    "Blast an enemy with a charge of radiant heat, dealing 1161 Flame Damage, and an additional 5370 Flame Damage over 30 seconds.\n\nUpon activation you gain Major Savagery and Major Prophecy for 30 seconds, increasing your Weapon and Spell Critical rating by 2629.",
  icon: "/esoui/art/icons/ability_templar_vampire_bane.dds",
  esoSkillId: 24180,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 1401,
  createdAt: "2026-05-26T03:13:12.542Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0161685 MaxStat + 0.167942 MaxPower - 3.95945 (Ultimate, ratio = 10.39, Dmg, Flame, SingleTarget, DOT, 28s duration, 2s tick, R2 = 0.999997)",
    "<<3>> = 30 seconds (Constant)",
    "<<4>> = Major Savagery (Constant)",
    "<<5>> = 30 seconds (Constant)",
    "<<6>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill
