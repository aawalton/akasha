import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceWeaknessToElements = {
  id: "019e6f53-a9b1-792a-856a-8297683583ae",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-weakness-to-elements",
  title: "Vengeance Weakness to Elements",
  key: "vengeance-weakness-to-elements",
  baseName: "Vengeance Weakness to Elements",
  description:
    '"Send the elements to sap an enemy\'s defenses and afflict them with Major Breach for |cffffff25|r seconds, reducing their Physical and Spell Resistance by |cffffff5948|r."',
  icon: "/esoui/art/icons/ability_destructionstaff_011.dds",
  esoSkillId: 241447,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "vengeance-weapon-destruction-staff",
} as const satisfies TemperSkill
