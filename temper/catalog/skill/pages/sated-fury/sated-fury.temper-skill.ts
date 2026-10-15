import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const satedFury = {
  id: "019e6251-4ce2-7c82-97eb-dea55a06a562",
  type: "page-type/temper-skill",
  slug: "sated-fury",
  title: "Sated Fury",
  key: "sated-fury",
  baseName: "Blood Frenzy",
  description:
    "Allow your monstrous appetites to take hold, increasing your Weapon and Spell Damage by 60 every 2 seconds, up to 5 times.\n\nWhile toggled on, the Health cost of this ability increases by 300 per stack and you cannot be healed by anyone but yourself, your pets, or your Companions.\n\nWhen toggled off, you heal for 33% of the total Health cost you spent while active.",
  icon: "/esoui/art/icons/ability_u26_vampire_02_b.dds",
  esoSkillId: 40135841,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 1128,
  createdAt: "2026-05-26T03:25:55.810Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 60 (Constant)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = 300 (Constant)",
    "<<4>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
