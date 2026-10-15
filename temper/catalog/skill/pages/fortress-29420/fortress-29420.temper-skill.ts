import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fortress29420 = {
  id: "019e6f53-a233-7cd4-bb7e-77725809a16f",
  type: "page-type/temper-skill",
  slug: "fortress-29420",
  title: "Fortress",
  key: "fortress-29420",
  baseName: "Fortress",
  description:
    "Reduces the Stamina cost of your One Hand and Shield abilities by |cffffff7|r% and reduces the cost of blocking by |cffffff18|r%.",
  icon: "/esoui/art/icons/ability_weapon_028.dds",
  esoSkillId: 29420,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/passive",
  hashPlace: 537,
  createdAt: "2026-05-28T16:03:32.531Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 7% (Constant)"],
} as const satisfies TemperSkill
