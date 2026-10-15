import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reusableParts = {
  id: "019e6245-a712-71dc-a8ef-da59c7f0eb8a",
  type: "page-type/temper-skill",
  slug: "reusable-parts",
  title: "Reusable Parts",
  key: "reusable-parts",
  baseName: "Reusable Parts",
  description:
    "When your Sacrificial Bones, Skeletal Mage, or Spirit Mender dies, the cost of your next Sacrificial Bones, Skeletal Mage, or Spirit Mender is reduced by 66%.",
  icon: "/esoui/art/icons/passive_necromancer_001.dds",
  esoSkillId: 116188,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 1061,
  createdAt: "2026-05-26T03:13:12.466Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Sacrificial Bones (Constant)",
    "<<2>> = Skeletal Mage (Constant)",
    "<<3>> = Spirit Mender (Constant)",
    "<<4>> = 66% (Constant)",
  ],
} as const satisfies TemperSkill
