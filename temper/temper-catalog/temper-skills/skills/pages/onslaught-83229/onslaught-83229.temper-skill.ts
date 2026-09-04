import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const onslaught83229 = {
  id: "019e6f53-a4ce-74c2-8dbf-bad28baabd8d",
  pageTypeSlug: "temper-skill",
  slug: "onslaught-83229",
  title: "Onslaught",
  key: "onslaught-83229",
  baseName: "Berserker Strike",
  description:
    '"Strike at an enemy with a vicious blow, dealing |cffffff12116|r Physical Damage to them and all nearby enemies.\\n\\nThis attack ignores the target\'s Resistance and grants you Physical and Spell Penetration for direct damage attacks equal to |cffffff100|r% of the amount ignored from the initial target and if Battle Spirit is inactive you gain |cffffff100|r% Critical Chance for |cffffff8|r seconds."',
  icon: "/esoui/art/icons/ability_2handed_006_a.dds",
  esoSkillId: 83229,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 50,
  skillLineId: "weapon-two-handed",
  skillType: "ultimate",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
