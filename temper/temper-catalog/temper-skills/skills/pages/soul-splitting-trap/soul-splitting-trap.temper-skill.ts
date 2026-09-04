import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulSplittingTrap = {
  id: "019e6251-4cef-738f-ba89-949740bd9a44",
  pageTypeSlug: "temper-skill",
  slug: "soul-splitting-trap",
  title: "Soul Splitting Trap",
  key: "soul-splitting-trap",
  baseName: "Soul Trap",
  description:
    '"Lay claim to enemy souls, dealing 2316 Magic Damage to your target and any other nearby enemies over 10 seconds.\\n\\nFills an empty Soul Gem if an affected enemy dies."',
  icon: "/esoui/art/icons/ability_otherclass_001_a.dds",
  esoSkillId: 43067,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "world-soul-magic",
} as const satisfies TemperSkill
