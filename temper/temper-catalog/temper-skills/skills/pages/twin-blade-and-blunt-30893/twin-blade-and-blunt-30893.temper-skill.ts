import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const twinBladeAndBlunt30893 = {
  id: "019e6f53-a86c-7d42-af52-29bee4756bba",
  pageTypeSlug: "temper-skill",
  slug: "twin-blade-and-blunt-30893",
  title: "Twin Blade and Blunt",
  key: "twin-blade-and-blunt-30893",
  baseName: "Twin Blade and Blunt",
  description:
    '"Grants a bonus based on the type of weapon equipped:\\n\\nEach axe increases your Critical Damage done by |cffffff3|r%.\\n\\nEach mace increases your Offensive Penetration by |cffffff743|r.\\n\\nEach sword increases your Weapon and Spell Damage by |cffffff64|r.\\n\\nEach dagger increases your Critical Chance rating by |cffffff328|r."',
  icon: "/esoui/art/icons/ability_weapon_016.dds",
  esoSkillId: 30893,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 41,
  morphIndex: 0,
  rank: 41,
  skillLineId: "weapon-dual-wield",
  skillType: "passive",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
