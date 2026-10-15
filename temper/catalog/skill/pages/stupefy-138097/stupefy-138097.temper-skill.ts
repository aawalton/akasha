import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const stupefy138097 = {
  id: "019e6f53-a7cf-79f1-ad40-e6d84bfdacda",
  type: "page-type/temper-skill",
  slug: "stupefy-138097",
  title: "Stupefy",
  key: "stupefy-138097",
  baseName: "Mesmerize",
  description:
    "Subdue enemies in front of you with your baleful gaze, stunning them for |cffffff5|r seconds if they are facing your direction.\n\nThis stun cannot be blocked.\n\nAfter the stun ends they remain stupefied, reducing their Movement Speed by |cffffff53|r% for |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_u26_vampire_04_b.dds",
  esoSkillId: 138097,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 1282,
  createdAt: "2026-05-28T16:03:33.967Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5 seconds (Constant)",
    "<<2>> = 50% (Constant)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
