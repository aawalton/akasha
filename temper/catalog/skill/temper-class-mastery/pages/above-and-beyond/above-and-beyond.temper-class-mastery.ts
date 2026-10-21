import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const aboveAndBeyond = {
  id: "01a15ea7-5fe9-7d6c-af9a-95af0566e523",
  type: "page-type/temper-class-mastery",
  slug: "above-and-beyond",
  title: "Above and Beyond",
  key: "above-and-beyond",
  description:
    "An assassin is only as good as their reputation.\n\nIncreases your Critical Damage and Healing by 25%. This effect is reduced to 5% against targets with Battle Spirit.\n\nIncreases your maximum Critical Damage and Healing by 30%.",
  esoSkillId: 263605,
  class: "temper-class/nightblade",
  effects: "jsonl",
  hashPlace: 17,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
