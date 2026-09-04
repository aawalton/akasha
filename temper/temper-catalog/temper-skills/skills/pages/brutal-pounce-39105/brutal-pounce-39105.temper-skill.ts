import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const brutalPounce39105 = {
  id: "019e6f53-9f93-7889-b797-2a1a7459a7cd",
  pageTypeSlug: "temper-skill",
  slug: "brutal-pounce-39105",
  title: "Brutal Pounce",
  key: "brutal-pounce-39105",
  baseName: "Pounce",
  description:
    '"Pounce on an enemy with primal fury, dealing |cffffff5350|r Bleed Damage and applying the Hemorrhaging status effect to all nearby enemies.\\n\\nWhen you are |cffffff7|r meters or closer this ability becomes Brutal Carnage, which causes you to rip into all enemies in front of you to deal |cffffff5362|r Bleed Damage over |cffffff12|r seconds, dealing up to |cffffff450|r% more damage to enemies under |cffffff100|r% Health. The duration increases by |cffffff10|r seconds if cast on the same enemy multiple times."',
  icon: "/esoui/art/icons/u50_ability_werewolf_brutal_pounce.dds",
  esoSkillId: 39105,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
