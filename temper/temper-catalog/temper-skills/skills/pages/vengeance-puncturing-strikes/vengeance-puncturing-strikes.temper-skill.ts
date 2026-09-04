import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeancePuncturingStrikes = {
  id: "019e6f53-a957-7162-ae4d-43414e095f99",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-puncturing-strikes",
  title: "Vengeance Puncturing Strikes",
  key: "vengeance-puncturing-strikes",
  baseName: "Vengeance Puncturing Strikes",
  description:
    '"Launch a relentless assault, striking enemies in front of you three times with your Aedric spear, dealing |cffffff4508|r Magic Damage to the closest 3 enemies."',
  icon: "/esoui/art/icons/ability_templar_trained_attacker.dds",
  esoSkillId: 237861,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-aedric-spear",
  skillType: "active",
  subcategoryId: "vengeance-templar-aedric-spear",
} as const satisfies TemperSkill
