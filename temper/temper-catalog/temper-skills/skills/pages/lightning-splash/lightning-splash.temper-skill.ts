import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lightningSplash = {
  id: "019e6f53-a3fd-7a56-afa1-107d9d736046",
  pageTypeSlug: "temper-skill",
  slug: "lightning-splash",
  title: "Lightning Splash",
  key: "lightning-splash",
  baseName: "Lightning Splash",
  description:
    '"Create a nexus of storm energy at the target location, dealing |cffffff1076|r Shock Damage to enemies in the area every |cffffff1|r second for |cffffff10|r seconds.\\n \\nYou or an ally standing within the nexus can activate the Conduit synergy, dealing |cffffff9914|r Shock Damage to enemies around them."',
  icon: "/esoui/art/icons/ability_sorcerer_lightning_splash.dds",
  esoSkillId: 23182,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
