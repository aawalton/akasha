import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ballOfLightning = {
  id: "019e6245-a5f3-704d-ba0c-a4b5f5046e8d",
  pageTypeSlug: "temper-skill",
  slug: "ball-of-lightning",
  title: "Ball of Lightning",
  key: "ball-of-lightning",
  baseName: "Bolt Escape",
  description:
    '"Transform yourself into pure energy and flash forward. After reaching your location, you become immune to snare and immobilize effects for 2 seconds. A ball of lightning is summoned at your end point, which intercepts up to 1 projectile attack made against you every 1 second for 3 seconds.\\n\\nCasting again within 4 seconds costs 33% more Magicka."',
  icon: "/esoui/art/icons/ability_sorcerer_ball_of_lightning.dds",
  esoSkillId: 30224,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
