import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const quickCloak38901 = {
  id: "019e6f53-a571-724a-94ba-72912e314969",
  pageTypeSlug: "temper-skill",
  slug: "quick-cloak-38901",
  title: "Quick Cloak",
  key: "quick-cloak-38901",
  baseName: "Blade Cloak",
  description:
    '"Envelop yourself in a protective cloak of razors, gaining Major Evasion for |cffffff30|r seconds, reducing damage from area attacks by |cffffff20|r%. \\n\\nEvery |cffffff2|r seconds the shrapnel will pulse, dealing |cffffff1468|r Physical Damage to all enemies within |cffffff5|r meters.\\n\\nYou also gain Major Expedition for |cffffff4|r seconds, increasing your Movement Speed by |cffffff30|r%."',
  icon: "/esoui/art/icons/ability_dualwield_004_a.dds",
  esoSkillId: 38901,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
