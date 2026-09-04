import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const satedFury135841 = {
  id: "019e6f53-a6b1-7736-a460-2b2c488c573c",
  pageTypeSlug: "temper-skill",
  slug: "sated-fury-135841",
  title: "Sated Fury",
  key: "sated-fury-135841",
  baseName: "Blood Frenzy",
  description:
    '"Allow your monstrous appetites to take hold, increasing your Weapon and Spell Damage by |cffffff60|r every |cffffff2|r seconds, up to |cffffff5|r times.\\n\\nWhile toggled on, the Health cost of this ability increases by |cffffff300|r per stack and you cannot be healed by anyone but yourself, your pets, or your Companions.\\n\\nWhen toggled off, you heal for |cffffff34|r% of the total Health cost you spent while active."',
  icon: "/esoui/art/icons/ability_u26_vampire_02_b.dds",
  esoSkillId: 135841,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
