import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dragonBlood = {
  id: "019e6f53-a0e3-7953-a703-8e9c195100a7",
  pageTypeSlug: "temper-skill",
  slug: "dragon-blood",
  title: "Dragon Blood",
  key: "dragon-blood",
  baseName: "Dragon Blood",
  description:
    '"Draw on your draconic blood to heal for |cffffff5193|r Health, increasing by up to |cffffff50|r% additional healing based on your missing Health. This ability scales off your Max Health.\\n\\nYou also gain Major Fortitude, increasing your Health Recovery by |cffffff30|r% for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_011.dds",
  esoSkillId: 29004,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
