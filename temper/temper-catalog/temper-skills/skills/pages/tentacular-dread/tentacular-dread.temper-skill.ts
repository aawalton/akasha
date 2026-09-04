import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const tentacularDread = {
  id: "019e6245-a750-74cf-919c-45d3786d3188",
  pageTypeSlug: "temper-skill",
  slug: "tentacular-dread",
  title: "Tentacular Dread",
  key: "tentacular-dread",
  baseName: "Abyssal Impact",
  description:
    '"Infuse your arm with abyssal magic to form tentacles that lash out at your foes, dealing 2002 Frost Damage. Enemies are immobilized for 3 seconds and marked with Abyssal Ink for 20 seconds.\\n\\nYou deal 5% increased damage to enemies drenched in Abyssal Ink.\\n\\nConsume all Crux and increase Tentacular Dread damage by 33% and damage to foes drenched in Abyssal Ink by 2% per Crux spent."',
  icon: "/esoui/art/icons/ability_arcanist_003_b.dds",
  esoSkillId: 40185823,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
