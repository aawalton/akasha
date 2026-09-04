import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const daedricRefuge = {
  id: "019e6245-a634-767a-b949-a28d42dc73b4",
  pageTypeSlug: "temper-skill",
  slug: "daedric-refuge",
  title: "Daedric Refuge",
  key: "daedric-refuge",
  baseName: "Daedric Mines",
  description:
    '"Carefully form 5 protective Daedric wards around you, which take 3 seconds to arm and last for 15 seconds.\\n\\nWhen a Daedric ward is triggered it grants you or the ally a damage shield that absorbs 3591 damage for 6 seconds. Targets can only be shielded by Daedric Refuge once every 2 seconds and the shield is capped at 43% of the target\'s Max Health."',
  icon: "/esoui/art/icons/ability_sorcerer_daedric_minefield.dds",
  esoSkillId: 29973,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
