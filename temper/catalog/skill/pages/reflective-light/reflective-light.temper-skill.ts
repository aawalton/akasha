import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reflectiveLight = {
  id: "019e6245-a703-72e9-b956-06b717810a59",
  type: "page-type/temper-skill",
  slug: "reflective-light",
  title: "Reflective Light",
  key: "reflective-light",
  baseName: "Sun Fire",
  description:
    "Blast up to three enemies with a charge of radiant heat, dealing 1199 Flame Damage, an additional 3470 Flame Damage over 20 seconds, and reducing their Movement Speed by 40% for 3 seconds.\n\nUpon activation you gain Major Savagery and Major Prophecy for 20 seconds, increasing your Weapon and Spell Critical rating by 2629.",
  icon: "/esoui/art/icons/ability_templar_reflective_light.dds",
  esoSkillId: 24195,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 1004,
  createdAt: "2026-05-26T03:13:12.451Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05335445 MaxStat + 0.560221725 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Flame, AOE, Direct, R2 = 1)",
    "<<2>> = 0.0156088 MaxStat + 0.162726 MaxPower - 2.99952 (Ultimate, ratio = 10.43, Dmg, Flame, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999995)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 40% (Constant)",
    "<<5>> = 3 seconds (Constant)",
    "<<6>> = Major Savagery (Constant)",
    "<<7>> = 20 seconds (Constant)",
    "<<8>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill
