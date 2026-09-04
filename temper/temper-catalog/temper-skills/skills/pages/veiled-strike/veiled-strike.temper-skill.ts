import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const veiledStrike = {
  id: "019e6f53-a8ab-77ce-8edf-e178c20b7184",
  pageTypeSlug: "temper-skill",
  slug: "veiled-strike",
  title: "Veiled Strike",
  key: "veiled-strike",
  baseName: "Veiled Strike",
  description:
    '"Slash an enemy, dealing |cffffff8076|r Magic Damage. \\n\\nIf you strike an enemy from their flank you set them Off Balance."',
  icon: "/esoui/art/icons/ability_nightblade_002.dds",
  esoSkillId: 25255,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
