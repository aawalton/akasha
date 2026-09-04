import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ruinousScythe = {
  id: "019e6245-a716-7489-878c-e6387675bd64",
  pageTypeSlug: "temper-skill",
  slug: "ruinous-scythe",
  title: "Ruinous Scythe",
  key: "ruinous-scythe",
  baseName: "Death Scythe",
  description:
    '"Slice into your enemy\'s life force, dealing 1799 Bleed Damage, applying the Hemorrhaging status effect, and setting them Off Balance for 7 seconds.\\n\\nYou heal for 2400 Health for the first enemy hit, and an additional 800 for each additional enemy, up to five times. The healing of this ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_necromancer_007_b.dds",
  esoSkillId: 40118226,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
