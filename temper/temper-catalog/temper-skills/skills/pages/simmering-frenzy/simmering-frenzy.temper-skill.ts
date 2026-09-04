import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const simmeringFrenzy = {
  id: "019e6251-4cea-7829-b402-eab4185e76fc",
  pageTypeSlug: "temper-skill",
  slug: "simmering-frenzy",
  title: "Simmering Frenzy",
  key: "simmering-frenzy",
  baseName: "Blood Frenzy",
  description:
    '"Allow your monstrous appetites to take hold, increasing your Weapon and Spell Damage by 80 every 2 seconds, up to 5 times.\\n\\nWhile toggled on, the Health cost of this ability increases by 360 per stack and you cannot be healed by anyone but yourself, your pets, or your Companions."',
  icon: "/esoui/art/icons/ability_u26_vampire_02_a.dds",
  esoSkillId: 40134160,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
