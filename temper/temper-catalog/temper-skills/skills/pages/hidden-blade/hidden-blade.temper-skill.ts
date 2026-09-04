import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hiddenBlade = {
  id: "019e6f53-a315-7ac5-b0f1-357f4a779c64",
  pageTypeSlug: "temper-skill",
  slug: "hidden-blade",
  title: "Hidden Blade",
  key: "hidden-blade",
  baseName: "Hidden Blade",
  description:
    '"Fire a secret dagger from your sleeve at an enemy, dealing |cffffff4846|r Physical Damage and granting you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff20|r seconds.\\n\\nIf the enemy hit is casting an ability they are interrupted, set Off Balance, and stunned for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_dualwield_003.dds",
  esoSkillId: 21157,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 38,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
