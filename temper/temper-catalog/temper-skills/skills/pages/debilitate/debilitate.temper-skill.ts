import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const debilitate = {
  id: "019e6245-a646-7e99-8b91-8490561cd1eb",
  pageTypeSlug: "temper-skill",
  slug: "debilitate",
  title: "Debilitate",
  key: "debilitate",
  baseName: "Cripple",
  description:
    '"Sap an enemy\'s agility and wrack them with pain, dealing 4785 Magic Damage over 20 seconds and reducing their Movement Speed by 50% for 4 seconds.\\n\\nThis ability has a higher chance of applying the Overcharged status effect."',
  icon: "/esoui/art/icons/ability_nightblade_006_a.dds",
  esoSkillId: 37887,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
