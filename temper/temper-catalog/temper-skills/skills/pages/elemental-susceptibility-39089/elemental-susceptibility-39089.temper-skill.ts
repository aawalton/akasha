import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalSusceptibility39089 = {
  id: "019e6f53-a126-7680-83f6-803cf43254ed",
  pageTypeSlug: "temper-skill",
  slug: "elemental-susceptibility-39089",
  title: "Elemental Susceptibility",
  key: "elemental-susceptibility-39089",
  baseName: "Weakness to Elements",
  description:
    '"Send the elements to sap an enemy\'s defenses and afflict them with Major Breach for |cffffff30|r seconds, reducing their Physical and Spell Resistance by |cffffff5948|r.\\n\\nEvery |cffffff7.5|r seconds the enemy is afflicted with the Burning, Chilled, and Concussion status effect."',
  icon: "/esoui/art/icons/ability_destructionstaff_011b.dds",
  esoSkillId: 39089,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
