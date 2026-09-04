import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shiftingStandard32958 = {
  id: "019e6f53-a701-7d8a-a465-7521141678ee",
  pageTypeSlug: "temper-skill",
  slug: "shifting-standard-32958",
  title: "Shifting Standard",
  key: "shifting-standard-32958",
  baseName: "Dragonknight Standard",
  description:
    '"Call down a battle standard, dealing |cffffff3128|r Flame Damage every |cffffff1|r second for |cffffff25|r seconds to enemies and applying Major Defile to them, reducing their healing received and damage shield strength by |cffffff12|r%. \\n\\nActivating this ability again allows you to move the standard to your location.\\n\\nAn ally near the standard can activate the Shackle synergy, dealing |cffffff12393|r Flame Damage to enemies in the area and immobilizing them for |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_006_a.dds",
  esoSkillId: 32958,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "ultimate",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
