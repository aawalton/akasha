import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reflectiveLight21732 = {
  id: "019e6f53-a5d7-716e-b418-79772ae62bff",
  type: "page-type/temper-skill",
  slug: "reflective-light-21732",
  title: "Reflective Light",
  key: "reflective-light-21732",
  baseName: "Sun Fire",
  description:
    "Blast up to three enemies with a charge of radiant heat, dealing |cffffff4406|r Flame Damage, an additional |cffffff11420|r Flame Damage over |cffffff20|r seconds, and reducing their Movement Speed by |cffffff40|r% for |cffffff3|r seconds.\n\nUpon activation you gain Major Savagery and Major Prophecy for |cffffff20|r seconds, increasing your Weapon and Spell Critical rating by |cffffff2629|r.",
  icon: "/esoui/art/icons/ability_templar_reflective_light.dds",
  esoSkillId: 21732,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 1005,
  createdAt: "2026-05-28T16:03:33.463Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, AOE, Direct, R2 = 1)",
    "<<2>> = 0.0156088 MaxStat + 0.162726 MaxPower - 2.99952 (Ultimate, ratio = 10.43, Dmg, Flame, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999995)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 40% (Constant)",
    "<<5>> = 3 seconds (Constant)",
    "<<6>> = Major Savagery (Constant)",
    "<<7>> = 20 seconds (Constant)",
    "<<8>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill
