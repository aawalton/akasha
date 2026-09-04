import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSkeletalMage = {
  id: "019e6f53-a987-7db9-a1da-27632c151098",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-skeletal-mage",
  title: "Vengeance Skeletal Mage",
  key: "vengeance-skeletal-mage",
  baseName: "Vengeance Skeletal Mage",
  description:
    '"Unearth a skeletal mage from the dirt at your enemy\'s location, causing them to cast one final spell after |cffffff1|r second before returning to their slumber and marking the enemy as a corpse. The spell deals |cffffff14175|r Shock Damage over |cffffff4|r seconds to the targeted enemy.\\n\\nOnly you can use the mark on a target for corpse consumption."',
  icon: "/esoui/art/icons/ability_necromancer_003.dds",
  esoSkillId: 246029,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-grave-lord",
} as const satisfies TemperSkill
