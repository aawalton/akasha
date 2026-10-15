import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const undeadConfederate116282 = {
  id: "019e6f53-a87c-7b75-935f-e37fe46b91e5",
  type: "page-type/temper-skill",
  slug: "undead-confederate-116282",
  title: "Undead Confederate",
  key: "undead-confederate-116282",
  baseName: "Undead Confederate",
  description:
    "While you have a Sacrificial Bones, Skeletal Mage, or Spirit Mender active, your Health, Magicka, and Stamina Recovery is increased by |cffffff77|r.",
  icon: "/esoui/art/icons/passive_necromancer_012.dds",
  esoSkillId: 116282,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/passive",
  hashPlace: 1381,
  createdAt: "2026-05-28T16:03:34.140Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Sacrificial Bones (Constant)",
    "<<2>> = Skeletal Mage (Constant)",
    "<<3>> = Spirit Mender (Constant)",
    "<<4>> = 77 (Constant)",
  ],
} as const satisfies TemperSkill
