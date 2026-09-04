import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bladeCloak = {
  id: "019e6f53-9f17-7175-a7bb-f9459dc65461",
  pageTypeSlug: "temper-skill",
  slug: "blade-cloak",
  title: "Blade Cloak",
  key: "blade-cloak",
  baseName: "Blade Cloak",
  description:
    '"Envelop yourself in a protective cloak of razors, gaining Major Evasion for |cffffff20|r seconds, reducing damage from area attacks by |cffffff20|r%. \\n\\nEvery |cffffff2|r seconds the shrapnel will pulse, dealing |cffffff1467|r Physical Damage to all enemies within |cffffff5|r meters."',
  icon: "/esoui/art/icons/ability_dualwield_004.dds",
  esoSkillId: 28613,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
