import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const spellAttunement = {
  id: "019e624a-12df-7273-9f79-53de6115a3a9",
  type: "page-type/temper-skill",
  slug: "spell-attunement",
  title: "Spell Attunement",
  key: "spell-attunement",
  baseName: "Spell Attunement",
  description:
    "Increases your Spell Resistance by 2310. This effect is doubled if you are afflicted with Burning, Chilled, or Concussed.  \n\nIncreases your Magicka Recovery by 130.",
  icon: "/esoui/art/icons/ability_sorcerer_013.dds",
  esoSkillId: 45262,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/racial-breton-skills",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
  hashPlace: 1244,
  createdAt: "2026-05-26T03:18:02.207Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 2310 (Constant)", "<<2>> = 130 (Constant)"],
} as const satisfies TemperSkill
