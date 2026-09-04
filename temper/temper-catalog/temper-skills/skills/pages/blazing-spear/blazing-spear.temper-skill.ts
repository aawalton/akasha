import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blazingSpear = {
  id: "019e6245-a5fa-7fe5-b96f-b51350dfc6c6",
  pageTypeSlug: "temper-skill",
  slug: "blazing-spear",
  title: "Blazing Spear",
  key: "blazing-spear",
  baseName: "Spear Shards",
  description:
    '"Send your spear into the heavens to bring down a shower of divine wrath, dealing 1742 Magic Damage to enemies in the area and an additional 276 Magic Damage every 1 second for 10 seconds. Enemies hit by the initial hit are immobilized for 4 seconds.\\n\\nAn ally near the spear can activate the Blessed Shards synergy, restoring 3960 Magicka or Stamina, whichever maximum is higher."',
  icon: "/esoui/art/icons/ability_templarsun_thrust.dds",
  esoSkillId: 27167,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
