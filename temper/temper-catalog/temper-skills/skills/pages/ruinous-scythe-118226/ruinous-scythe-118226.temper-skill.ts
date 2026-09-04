import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ruinousScythe118226 = {
  id: "019e6f53-a675-777e-8a4c-d8b072d51757",
  pageTypeSlug: "temper-skill",
  slug: "ruinous-scythe-118226",
  title: "Ruinous Scythe",
  key: "ruinous-scythe-118226",
  baseName: "Death Scythe",
  description:
    '"Slice into your enemy\'s life force, dealing |cffffff6611|r Bleed Damage, applying the Hemorrhaging status effect, and setting them Off Balance for |cffffff7|r seconds.\\n\\nYou heal for |cffffff3016|r Health for the first enemy hit, and an additional |cffffff1005|r for each additional enemy, up to five times. The healing of this ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_necromancer_007_b.dds",
  esoSkillId: 118226,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
