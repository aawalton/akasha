import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const invasion = {
  id: "019e6226-00fc-78cb-b65c-bb5bb1ae0028",
  pageTypeSlug: "temper-skill",
  slug: "invasion",
  title: "Invasion",
  key: "invasion",
  baseName: "Shield Charge",
  description:
    '"Rush an enemy and ram them, dealing 1393 Physical Damage and stunning them for 4 seconds.\\n\\nStuns up to 50% longer based on the distance traveled."',
  icon: "/esoui/art/icons/ability_1handed_003_b.dds",
  esoSkillId: 41538,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
