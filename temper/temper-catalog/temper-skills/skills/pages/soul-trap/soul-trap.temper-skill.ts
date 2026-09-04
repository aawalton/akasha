import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulTrap = {
  id: "019e6f53-a77e-76c3-9370-2e8c20d7a047",
  pageTypeSlug: "temper-skill",
  slug: "soul-trap",
  title: "Soul Trap",
  key: "soul-trap",
  baseName: "Soul Trap",
  description:
    '"Lay claim to an enemy\'s soul, dealing |cffffff15224|r Magic Damage over |cffffff20|r seconds.\\n\\nFills an empty Soul Gem if an affected enemy dies."',
  icon: "/esoui/art/icons/ability_otherclass_001.dds",
  esoSkillId: 26768,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "world-soul-magic",
} as const satisfies TemperSkill
