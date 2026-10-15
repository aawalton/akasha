import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hiddenBlade = {
  id: "019e6f53-a315-7ac5-b0f1-357f4a779c64",
  type: "page-type/temper-skill",
  slug: "hidden-blade",
  title: "Hidden Blade",
  key: "hidden-blade",
  baseName: "Hidden Blade",
  description:
    "Fire a secret dagger from your sleeve at an enemy, dealing |cffffff4846|r Physical Damage and granting you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff20|r seconds.\n\nIf the enemy hit is casting an ability they are interrupted, set Off Balance, and stunned for |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_dualwield_003.dds",
  esoSkillId: 21157,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 631,
  createdAt: "2026-05-28T16:03:32.757Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06 MaxStat + 0.63 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, R2 = 1)",
    "<<2>> = Major Brutality (Constant)",
    "<<3>> = 20% (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
