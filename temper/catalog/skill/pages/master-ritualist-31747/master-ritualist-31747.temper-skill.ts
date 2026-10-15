import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const masterRitualist31747 = {
  id: "019e6f53-a463-7ac3-b580-faa75b08f6e5",
  type: "page-type/temper-skill",
  slug: "master-ritualist-31747",
  title: "Master Ritualist",
  key: "master-ritualist-31747",
  baseName: "Master Ritualist",
  description:
    "Increases resurrection speed by |cffffff10|r%. \n\nResurrected allies return with |cffffff50|r% more Health. \n\nGives you a |cffffff50|r% chance to fill an empty Soul Gem after each successful resurrection.",
  icon: "/esoui/art/icons/ability_templar_026.dds",
  esoSkillId: 31747,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/passive",
  hashPlace: 808,
  createdAt: "2026-05-28T16:03:33.091Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 10% (Constant)", "<<2>> = 50% (Constant)"],
} as const satisfies TemperSkill
