import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const piercingCold86195 = {
  id: "019e6f53-a503-787a-b2ee-db97d9035067",
  type: "page-type/temper-skill",
  slug: "piercing-cold-86195",
  title: "Piercing Cold",
  key: "piercing-cold-86195",
  baseName: "Piercing Cold",
  description:
    "Increases the amount of damage you block by |cffffff4|r% and increases your Frost Damage by |cffffff7|r%.",
  icon: "/esoui/art/icons/passive_warden_004.dds",
  esoSkillId: 86195,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/passive",
  hashPlace: 894,
  createdAt: "2026-05-28T16:03:33.251Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 4% (Constant)", "<<2>> = 7% (Constant)"],
} as const satisfies TemperSkill
