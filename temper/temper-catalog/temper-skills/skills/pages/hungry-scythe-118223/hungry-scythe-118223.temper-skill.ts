import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hungryScythe118223 = {
  id: "019e6f53-a32f-70e0-a0c8-033e9a37540e",
  pageTypeSlug: "temper-skill",
  slug: "hungry-scythe-118223",
  title: "Hungry Scythe",
  key: "hungry-scythe-118223",
  baseName: "Death Scythe",
  description:
    '"Slice into your enemy\'s life force, dealing |cffffff6401|r Magic Damage.  \\n\\nYou heal for |cffffff3016|r Health for the first enemy hit, and an additional |cffffff1005|r for each additional enemy, up to five times. After dealing damage, you heal for |cffffff1246|r Health every |cffffff2|r seconds over |cffffff10|r seconds. The healing of this ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_necromancer_007_a.dds",
  esoSkillId: 118223,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
