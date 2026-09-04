import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const searingClaw = {
  id: "019e6f53-a6cd-759d-afca-ec7f00a5c39f",
  pageTypeSlug: "temper-skill",
  slug: "searing-claw",
  title: "Searing Claw",
  key: "searing-claw",
  baseName: "Searing Strike",
  description:
    '"Slash your foe with a fiery claw, dealing |cffffff4038|r Flame Damage and an additional |cffffff11425|r Flame Damage over |cffffff10|r seconds.\\n\\nThe flame sears into the target, dealing |cffffff10|r% more damage every |cffffff2|r seconds.\\n\\nThe initial hit always applies the Burning status effect."',
  icon: "/esoui/art/icons/ability_dragonknight_003_a.dds",
  esoSkillId: 20668,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
