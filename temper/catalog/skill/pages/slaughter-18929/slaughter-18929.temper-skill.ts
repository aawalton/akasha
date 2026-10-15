import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const slaughter18929 = {
  id: "019e6f53-a739-7925-8e69-ed7ef691156b",
  type: "page-type/temper-skill",
  slug: "slaughter-18929",
  title: "Slaughter",
  key: "slaughter-18929",
  baseName: "Slaughter",
  description:
    "Increases damage with Dual Wield abilities by |cffffff10|r% against enemies with under |cffffff25|r% Health.",
  icon: "/esoui/art/icons/ability_weapon_019.dds",
  esoSkillId: 18929,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/passive",
  hashPlace: 1205,
  createdAt: "2026-05-28T16:03:33.817Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 10% (Constant)"],
} as const satisfies TemperSkill
