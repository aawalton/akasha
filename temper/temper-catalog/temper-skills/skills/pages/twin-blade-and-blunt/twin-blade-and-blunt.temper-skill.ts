import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const twinBladeAndBlunt = {
  id: "019e6226-011c-743f-8e01-6480b0d2e5fa",
  pageTypeSlug: "temper-skill",
  slug: "twin-blade-and-blunt",
  title: "Twin Blade and Blunt",
  key: "twin-blade-and-blunt",
  baseName: "Twin Blade and Blunt",
  description:
    '"Grants a bonus based on the type of weapon equipped:\\n\\nEach axe increases your Critical Damage done by 6%.\\n\\nEach mace increases your Offensive Penetration by 1487.\\n\\nEach sword increases your Weapon and Spell Damage by 129.\\n\\nEach dagger increases your Critical Chance rating by 657."',
  icon: "/esoui/art/icons/ability_weapon_016.dds",
  esoSkillId: 45482,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-dual-wield",
  skillType: "passive",
  subcategoryId: "weapon-dual-wield",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
