import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ballOfLightning23277 = {
  id: "019e6f53-9ee5-72e3-aef8-f0fd730185b5",
  pageTypeSlug: "temper-skill",
  slug: "ball-of-lightning-23277",
  title: "Ball of Lightning",
  key: "ball-of-lightning-23277",
  baseName: "Bolt Escape",
  description:
    '"Transform yourself into pure energy and flash forward. After reaching your location, you become immune to snare and immobilize effects for |cffffff2|r seconds. A ball of lightning is summoned at your end point, which intercepts up to |cffffff1|r projectile attack made against you every |cffffff1|r second for |cffffff3|r seconds.\\n\\nCasting again within |cffffff4|r seconds costs |cffffff33|r% more Magicka."',
  icon: "/esoui/art/icons/ability_sorcerer_ball_of_lightning.dds",
  esoSkillId: 23277,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
