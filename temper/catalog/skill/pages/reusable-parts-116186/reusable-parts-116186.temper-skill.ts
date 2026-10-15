import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reusableParts116186 = {
  id: "019e6f53-a63d-7c56-b076-e9aab887f674",
  type: "page-type/temper-skill",
  slug: "reusable-parts-116186",
  title: "Reusable Parts",
  key: "reusable-parts-116186",
  baseName: "Reusable Parts",
  description:
    "When your Sacrificial Bones, Skeletal Mage, or Spirit Mender dies, the cost of your next Sacrificial Bones, Skeletal Mage, or Spirit Mender is reduced by |cffffff33|r%.",
  icon: "/esoui/art/icons/passive_necromancer_001.dds",
  esoSkillId: 116186,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/passive",
  hashPlace: 1062,
  createdAt: "2026-05-28T16:03:33.565Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Sacrificial Bones (Constant)",
    "<<2>> = Skeletal Mage (Constant)",
    "<<3>> = Spirit Mender (Constant)",
    "<<4>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
