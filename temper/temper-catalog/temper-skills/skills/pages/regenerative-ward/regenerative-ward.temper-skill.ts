import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const regenerativeWard = {
  id: "019e6245-a706-75ee-95f3-d8325fc86efe",
  pageTypeSlug: "temper-skill",
  slug: "regenerative-ward",
  title: "Regenerative Ward",
  key: "regenerative-ward",
  baseName: "Conjured Ward",
  description:
    '"Conjure globes of Daedric energy for protection, granting a damage shield for you and your pets that absorbs 5454 damage for 10 seconds, heals you for 826 Health, and grants Minor Intellect and Minor Endurance to you and nearby allies for 10 seconds.\\n\\nThis ability scales off the higher of your Max Health or Magicka and the shield is capped at 55% of your Max Health."',
  icon: "/esoui/art/icons/ability_sorcerer_tempest.dds",
  esoSkillId: 30486,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
