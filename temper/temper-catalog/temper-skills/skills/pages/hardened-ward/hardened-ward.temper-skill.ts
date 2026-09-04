import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hardenedWard = {
  id: "019e6245-a69a-7c6c-bc84-7ac46cc494d0",
  pageTypeSlug: "temper-skill",
  slug: "hardened-ward",
  title: "Hardened Ward",
  key: "hardened-ward",
  baseName: "Conjured Ward",
  description:
    '"Conjure globes of Daedric energy for protection, granting a damage shield for you and your pets that absorbs 7323 damage for 6 seconds.\\n\\nThis ability scales off the higher of your Max Health or Magicka and the shield is capped at 72% of your Max Health."',
  icon: "/esoui/art/icons/ability_sorcerer_typhoon.dds",
  esoSkillId: 30474,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
