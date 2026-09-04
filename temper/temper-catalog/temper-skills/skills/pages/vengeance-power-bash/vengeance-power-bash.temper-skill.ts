import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeancePowerBash = {
  id: "019e6f53-a954-741f-827a-6e96344e451c",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-power-bash",
  title: "Vengeance Power Bash",
  key: "vengeance-power-bash",
  baseName: "Vengeance Power Bash",
  description:
    '"Strike an enemy full-force with your shield, dealing |cffffff11257|r Physical Damage. \\n\\nThis ability\'s damage is considered Bash damage and interrupts the enemy if they are casting."',
  icon: "/esoui/art/icons/ability_1handed_005.dds",
  esoSkillId: 240569,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "vengeance-weapon-one-hand-and-shield",
} as const satisfies TemperSkill
