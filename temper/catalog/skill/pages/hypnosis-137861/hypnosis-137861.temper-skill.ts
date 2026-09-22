import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hypnosis137861 = {
  id: "019e6f53-a33a-7d91-b6b3-cd97782971fb",
  type: "page-type/temper-skill",
  slug: "hypnosis-137861",
  title: "Hypnosis",
  key: "hypnosis-137861",
  baseName: "Mesmerize",
  description:
    '"Subdue enemies around you with your baleful gaze, stunning them for |cffffff5|r seconds if they are facing your direction.\\n\\nThis stun cannot be blocked."',
  icon: "/esoui/art/icons/ability_u26_vampire_04_a.dds",
  esoSkillId: 137861,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 6,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
