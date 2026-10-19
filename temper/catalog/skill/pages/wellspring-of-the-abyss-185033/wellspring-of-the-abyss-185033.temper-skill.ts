import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const wellspringOfTheAbyss185033 = {
  id: "019e6f53-a9e1-7944-9859-d7ce5bd109fc",
  type: "page-type/temper-skill",
  slug: "wellspring-of-the-abyss-185033",
  title: "Wellspring of the Abyss",
  key: "wellspring-of-the-abyss-185033",
  baseName: "Wellspring of the Abyss",
  description:
    "Apocryphal knowledge bubbles up from the depths of your psyche, increasing your Health, Magicka, and Stamina Recovery by |cffffff40|r for each Soldier of Apocrypha ability slotted.\n\nCurrent bonus: |cffffff0|r.",
  icon: "/esoui/art/icons/passive_arcanist_07.dds",
  esoSkillId: 185033,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/passive",
  effects: "jsonl",
  hashPlace: 1613,
  createdAt: "2026-05-28T16:03:34.497Z",
  updatedAt: "2026-10-19T22:59:16.876Z",
  equations: [
    "<<1>> = 40 (Constant)",
    "<<2>> = 40 SoldierofApocrypha (Soldier of Apocrypha Skills Slotted, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
