import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceChainsOfFlame = {
  id: "019e6f53-a8d0-74c2-8adb-7ce9e0b7a720",
  type: "page-type/temper-skill",
  slug: "vengeance-chains-of-flame",
  title: "Vengeance Chains of Flame",
  key: "vengeance-chains-of-flame",
  baseName: "Vengeance Chains of Flame",
  description:
    '"Launch a fiery chain to grasp and pull an enemy to you, dealing |cffffff6678|r Flame Damage.\\n\\nThis attack cannot be dodged or reflected."',
  icon: "/esoui/art/icons/ability_dragonknight_005.dds",
  esoSkillId: 237620,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
