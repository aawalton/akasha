import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cephaliarchsFlail = {
  id: "019e6245-a613-7e09-9acd-4a5fb760dc4c",
  pageTypeSlug: "temper-skill",
  slug: "cephaliarchs-flail",
  title: "Cephaliarch's Flail",
  key: "cephaliarchs-flail",
  baseName: "Abyssal Impact",
  description:
    '"Infuse your arm with abyssal magic to form tentacles that lash out at your foes dealing 1939 Physical Damage and generating Crux. Enemies are immobilized for 3 seconds and marked with Abyssal Ink for 20 seconds.\\n\\nIf an enemy is hit, you for heal for 1000 Health, once per cast.\\n\\nYou deal 5% increased damage to enemies drenched in Abyssal Ink."',
  icon: "/esoui/art/icons/ability_arcanist_003_a.dds",
  esoSkillId: 40183006,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
