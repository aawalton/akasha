import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ghostlyEmbrace = {
  id: "019e6245-a68f-7bdd-ac77-5d6ffe11ce3e",
  pageTypeSlug: "temper-skill",
  slug: "ghostly-embrace",
  title: "Ghostly Embrace",
  key: "ghostly-embrace",
  baseName: "Grave Grasp",
  description:
    '"Summon three patches of skeletal claws from the ground in front of you, each dealing 898 Frost Damage.\\n\\nThe first area applies the Chilled status effect, the second area deals an additional 1635 Frost Damage over 5 seconds, and the final area creates a corpse if at least one enemy was hit."',
  icon: "/esoui/art/icons/ability_necromancer_009_b.dds",
  esoSkillId: 40118308,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
