import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const powerSlam38452 = {
  id: "019e6f53-a52e-75f9-9ae4-ebe16abe7ee8",
  pageTypeSlug: "temper-skill",
  slug: "power-slam-38452",
  title: "Power Slam",
  key: "power-slam-38452",
  baseName: "Power Bash",
  description:
    '"Strike an enemy full-force with your shield, dealing |cffffff8469|r Physical Damage.\\n\\nWhile slotted, blocking any attack grants you Resentment, which reduces the cost of your next Power Slam cast within |cffffff10|r seconds by |cffffff50|r%.\\n\\nThis ability\'s damage is considered Bash damage and interrupts the enemy if they are casting."',
  icon: "/esoui/art/icons/ability_1handed_005_a.dds",
  esoSkillId: 38452,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 38,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
