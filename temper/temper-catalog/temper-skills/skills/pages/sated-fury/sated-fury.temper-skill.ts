import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const satedFury = {
  id: "019e6251-4ce2-7c82-97eb-dea55a06a562",
  pageTypeSlug: "temper-skill",
  slug: "sated-fury",
  title: "Sated Fury",
  key: "sated-fury",
  baseName: "Blood Frenzy",
  description:
    '"Allow your monstrous appetites to take hold, increasing your Weapon and Spell Damage by 60 every 2 seconds, up to 5 times.\\n\\nWhile toggled on, the Health cost of this ability increases by 300 per stack and you cannot be healed by anyone but yourself, your pets, or your Companions.\\n\\nWhen toggled off, you heal for 33% of the total Health cost you spent while active."',
  icon: "/esoui/art/icons/ability_u26_vampire_02_b.dds",
  esoSkillId: 40135841,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
