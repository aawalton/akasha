import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mysticGuard = {
  id: "019e6251-4cd3-726f-8f77-fd4a24f42b86",
  pageTypeSlug: "temper-skill",
  slug: "mystic-guard",
  title: "Mystic Guard",
  key: "mystic-guard",
  baseName: "Guard",
  description:
    '"Create a lifebond between you and an allied player. While bonded, 30% of the damage they take is instead redistributed to you.\\n\\nYou and your bonded ally also gain Minor Vitality, increasing your healing received and damage shield strength by 6%.\\n\\nThe bond will remain until you recast the spell or move more than 15 meters away from your ally."',
  icon: "/esoui/art/icons/ability_ava_mystic_guard.dds",
  esoSkillId: 63335,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 8,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
