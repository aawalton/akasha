import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cinderStorm = {
  id: "019e6245-a61c-7734-acd0-5084ec5d1b80",
  pageTypeSlug: "temper-skill",
  slug: "cinder-storm",
  title: "Cinder Storm",
  key: "cinder-storm",
  baseName: "Ash Cloud",
  description:
    '"Summon a scorching cloud of ash at the target location for 15 seconds, reducing enemy Movement Speed by 70% and healing you and your allies for 674 every 1 second."',
  icon: "/esoui/art/icons/ability_dragonknight_016a.dds",
  esoSkillId: 0,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
