import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lightningFlood = {
  id: "019e6245-a6bc-7da3-8450-59f8487342d2",
  pageTypeSlug: "temper-skill",
  slug: "lightning-flood",
  title: "Lightning Flood",
  key: "lightning-flood",
  baseName: "Lightning Splash",
  description:
    '"Create a nexus of storm energy at the target location, dealing 415 Shock Damage to enemies in the area every 1 second for 10 seconds.\\n \\nYou or an ally standing within the nexus can activate the Conduit synergy, dealing 2698 Shock Damage to enemies around them."',
  icon: "/esoui/art/icons/ability_sorcerer_lightning_flood.dds",
  esoSkillId: 30302,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
