import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const berserkerRage = {
  id: "019e6226-00d6-7448-a192-766a5fb3da00",
  pageTypeSlug: "temper-skill",
  slug: "berserker-rage",
  title: "Berserker Rage",
  key: "berserker-rage",
  baseName: "Berserker Strike",
  description:
    '"Strike at an enemy with a vicious blow, dealing 3600 Physical Damage to them and all nearby enemies.\\n\\nThis attack ignores the target\'s Resistance and grants you Physical and Spell Resistance equal to the amount ignored from the initial target for 8 seconds.\\n\\nYou are immune to all disabling, snare, and immobilization effects for the duration."',
  icon: "/esoui/art/icons/ability_2handed_006_b.dds",
  esoSkillId: 86295,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-two-handed",
  skillType: "ultimate",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
