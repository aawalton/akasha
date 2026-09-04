import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cuttingDive = {
  id: "019e6245-a630-7152-902f-0304690923d2",
  pageTypeSlug: "temper-skill",
  slug: "cutting-dive",
  title: "Cutting Dive",
  key: "cutting-dive",
  baseName: "Dive",
  description:
    '"Command a cliff racer to dive bomb an enemy, dealing 2091 Bleed Damage immediately and then causing them to bleed for 2140 Bleed Damage over 10 seconds.\\n\\nIf you are more than 7 meters away from the target, you set them Off Balance for 7 seconds."',
  icon: "/esoui/art/icons/ability_warden_013_b.dds",
  esoSkillId: 86002,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
