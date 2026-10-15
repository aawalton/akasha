import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const flyingBlade = {
  id: "019e6226-00f1-722b-90d7-437375725da0",
  type: "page-type/temper-skill",
  slug: "flying-blade",
  title: "Flying Blade",
  key: "flying-blade",
  baseName: "Hidden Blade",
  description:
    "Fire a secret dagger from your sleeve at an enemy, dealing 1438 Physical Damage and marking them for 5 seconds.\n\nIf the enemy hit is casting an ability they are interrupted, set Off Balance, and stunned for 3 seconds.\n\nReactivating this ability on them allows you to jump to a marked enemy free of cost, dealing 2160 Physical Damage.\n\nCasting grants you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20% for 40 seconds.",
  icon: "/esoui/art/icons/ability_dualwield_003_a.dds",
  esoSkillId: 40628,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 524,
  createdAt: "2026-05-26T02:38:38.321Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06402534 MaxStat + 0.67226607 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 5 seconds (Constant)",
    "<<3>> = 3 seconds (Constant)",
    "<<4>> = 0.09603801 MaxStat + 1.008399105 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<5>> = Major Brutality (Constant)",
    "<<6>> = 20% (Constant)",
    "<<7>> = 40 seconds (Constant)",
  ],
} as const satisfies TemperSkill
