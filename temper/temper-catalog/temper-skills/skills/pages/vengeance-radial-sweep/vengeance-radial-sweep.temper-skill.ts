import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRadialSweep = {
  id: "019e6f53-a959-7e58-bfa5-c815fed44038",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-radial-sweep",
  title: "Vengeance Radial Sweep",
  key: "vengeance-radial-sweep",
  baseName: "Vengeance Radial Sweep",
  description:
    '"Swing your Aedric spear around with holy vengeance, dealing |cffffff17640|r Magic Damage to up to 3 nearby enemies."',
  icon: "/esoui/art/icons/ability_templar_radial_sweep.dds",
  esoSkillId: 237811,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-aedric-spear",
  skillType: "ultimate",
  subcategoryId: "vengeance-templar-aedric-spear",
} as const satisfies TemperSkill
