import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hungryScythe = {
  id: "019e6245-a6a8-7109-b7f7-39367708b043",
  pageTypeSlug: "temper-skill",
  slug: "hungry-scythe",
  title: "Hungry Scythe",
  key: "hungry-scythe",
  baseName: "Death Scythe",
  description:
    '"Slice into your enemy\'s life force, dealing 1742 Magic Damage.  \\n\\nYou heal for 2400 Health for the first enemy hit, and an additional 800 for each additional enemy, up to five times. After dealing damage, you heal for 991 Health every 2 seconds over 10 seconds. The healing of this ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_necromancer_007_a.dds",
  esoSkillId: 40118223,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
