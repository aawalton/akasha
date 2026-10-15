import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const twinBladeAndBlunt = {
  id: "019e6226-011c-743f-8e01-6480b0d2e5fa",
  type: "page-type/temper-skill",
  slug: "twin-blade-and-blunt",
  title: "Twin Blade and Blunt",
  key: "twin-blade-and-blunt",
  baseName: "Twin Blade and Blunt",
  description:
    "Grants a bonus based on the type of weapon equipped:\n\nEach axe increases your Critical Damage done by 6%.\n\nEach mace increases your Offensive Penetration by 1487.\n\nEach sword increases your Weapon and Spell Damage by 129.\n\nEach dagger increases your Critical Chance rating by 657.",
  icon: "/esoui/art/icons/ability_weapon_016.dds",
  esoSkillId: 45482,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 1371,
  createdAt: "2026-05-26T02:38:38.364Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 6% (Constant)", "<<2>> = 1487 (Constant)", "<<3>> = 129 (Constant)"],
} as const satisfies TemperSkill
