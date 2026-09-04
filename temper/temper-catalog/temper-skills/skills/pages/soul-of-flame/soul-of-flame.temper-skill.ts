import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulOfFlame = {
  id: "019e6f53-a768-76d7-9a0f-41806656e936",
  pageTypeSlug: "temper-skill",
  slug: "soul-of-flame",
  title: "Soul of Flame",
  key: "soul-of-flame",
  baseName: "Core of Flame",
  description:
    '"Let the fire within draw heat to your soul, restoring |cffffff15|r% of your missing Magicka and Stamina every |cffffff2|r seconds over |cffffff4|r seconds.\\n\\nMuch of this heat is drawn from enemies around you. Those that are casting are interrupted, set Off Balance, and stunned for |cffffff2|r seconds.\\n\\nWhen this ability completes, you release this heat as a blast of fire that deals |cffffff10138|r Flame Damage to nearby enemies."',
  icon: "/esoui/art/icons/ability_dragonknight_012_a.dds",
  esoSkillId: 32792,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
