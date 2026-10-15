import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const prodigy = {
  id: "019e6238-c2f9-7c9d-a159-a6bfbbbac5f1",
  type: "page-type/temper-skill",
  slug: "prodigy",
  title: "Prodigy",
  key: "prodigy",
  baseName: "Prodigy",
  description:
    "Increases your Weapon and Spell Critical rating by 219 for each piece of Light Armor equipped.\n\nCurrent bonus: 0.",
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoSkillId: 45561,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/armor-light-armor",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 931,
  createdAt: "2026-05-26T02:59:07.641Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 219 (Constant)",
    "<<2>> = 219 LightArmor (Light Armor, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
