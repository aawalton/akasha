import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const manifestationOfTerror = {
  id: "019e6245-a6c8-7c28-b269-9c22785ca38d",
  pageTypeSlug: "temper-skill",
  slug: "manifestation-of-terror",
  title: "Manifestation of Terror",
  key: "manifestation-of-terror",
  baseName: "Aspect of Terror",
  description:
    '"Conceal a sinister trap at the target location, which takes 2 seconds to arm and lasts for 20 seconds.\\n\\nWhen the trap is triggered, up to 6 enemies in the area become terrified, causing them to cower in fear for 2 seconds and be afflicted with Major Cowardice for 10 seconds, reducing their Weapon and Spell Damage by 430."',
  icon: "/esoui/art/icons/ability_nightblade_016_b.dds",
  esoSkillId: 38096,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
