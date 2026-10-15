import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const stupefy = {
  id: "019e6251-4cf4-7759-bc8e-75b4ba0534c4",
  type: "page-type/temper-skill",
  slug: "stupefy",
  title: "Stupefy",
  key: "stupefy",
  baseName: "Mesmerize",
  description:
    "Subdue enemies in front of you with your baleful gaze, stunning them for 5 seconds if they are facing your direction.\n\nThis stun cannot be blocked.\n\nAfter the stun ends they remain stupefied, reducing their Movement Speed by 53% for 5 seconds.",
  icon: "/esoui/art/icons/ability_u26_vampire_04_b.dds",
  esoSkillId: 40138097,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 1281,
  createdAt: "2026-05-26T03:25:55.828Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5 seconds (Constant)",
    "<<2>> = 53% (Constant)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
