import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const felineAmbush = {
  id: "019e624a-12c9-71d9-a52b-db5a22548c13",
  type: "page-type/temper-skill",
  slug: "feline-ambush",
  title: "Feline Ambush",
  key: "feline-ambush",
  baseName: "Feline Ambush",
  description:
    "Increases your Critical Damage and Critical Healing by 12%.\n\nDecreases your detection radius in Stealth by 3 meters.",
  icon: "/esoui/art/icons/ability_armor_006.dds",
  esoSkillId: 45301,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/racial-khajiit-skills",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
  hashPlace: 503,
  createdAt: "2026-05-26T03:18:02.185Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 12% (Constant)", "<<2>> = 3 meters (Constant)"],
} as const satisfies TemperSkill
