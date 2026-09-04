import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const buddingSeeds85840 = {
  id: "019e6f53-9f96-784b-b2e6-fa757b87100b",
  pageTypeSlug: "temper-skill",
  slug: "budding-seeds-85840",
  title: "Budding Seeds",
  key: "budding-seeds-85840",
  baseName: "Healing Seed",
  description:
    '"Summon a field of flowers which blooms after |cffffff6|r seconds, healing you and allies in the area for |cffffff10960|r Health.\\n\\nWhile the field grows, you and allies are healed for |cffffff1292|r Health every |cffffff1|r second.  \\n\\nYou can activate this ability again to cause it to instantly bloom.\\n\\nAn ally within the field can activate the Harvest synergy, healing for |cffffff10602|r Health over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_warden_007_b.dds",
  esoSkillId: 85840,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
