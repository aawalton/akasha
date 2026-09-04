import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const wellspringOfTheAbyss = {
  id: "019e6245-a769-7a21-a053-8299fd9c6c2b",
  pageTypeSlug: "temper-skill",
  slug: "wellspring-of-the-abyss",
  title: "Wellspring of the Abyss",
  key: "wellspring-of-the-abyss",
  baseName: "Wellspring of the Abyss",
  description:
    '"Apocryphal knowledge bubbles up from the depths of your psyche, increasing your Health, Magicka, and Stamina Recovery by 81 for each Soldier of Apocrypha ability slotted.\\n\\nCurrent bonus: 0."',
  icon: "/esoui/art/icons/passive_arcanist_07.dds",
  esoSkillId: 185036,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "passive",
  subcategoryId: "arcanist-soldier-of-apocrypha",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
