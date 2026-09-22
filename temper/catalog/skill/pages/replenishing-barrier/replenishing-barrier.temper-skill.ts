import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const replenishingBarrier = {
  id: "019e6251-4cde-7425-99db-785246611405",
  type: "page-type/temper-skill",
  slug: "replenishing-barrier",
  title: "Replenishing Barrier",
  key: "replenishing-barrier",
  baseName: "Barrier",
  description:
    '"Invoke defensive tactics to protect yourself and nearby group members with wards that each absorb up to 11620 damage. \\n\\nEach time a ward dissolves, you restore 1500 Magicka."',
  icon: "/esoui/art/icons/ability_ava_006_a.dds",
  esoSkillId: 46622,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/ultimate",
} as const satisfies TemperSkill
