import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deadlyCloak = {
  id: "019e6226-00e0-7c84-a073-5c55ba915c3f",
  pageTypeSlug: "temper-skill",
  slug: "deadly-cloak",
  title: "Deadly Cloak",
  key: "deadly-cloak",
  baseName: "Blade Cloak",
  description:
    '"Envelop yourself in a protective cloak of razors, gaining Major Evasion for 20 seconds, reducing damage from area attacks by 20%. \\n\\nEvery 2 seconds the shrapnel will pulse, dealing 567 Physical Damage to all enemies within 5 meters."',
  icon: "/esoui/art/icons/ability_dualwield_004_b.dds",
  esoSkillId: 40651,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
