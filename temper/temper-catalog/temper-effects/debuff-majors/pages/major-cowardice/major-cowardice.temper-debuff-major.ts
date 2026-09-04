import type { TemperDebuffMajor } from "../../temper-debuff-major.page-type.ts"

export const majorCowardice = {
  id: "01a05fc6-42c1-76c0-88d6-6d8ca070c380",
  pageTypeSlug: "temper-debuff-major",
  slug: "major-cowardice",
  title: "Major Cowardice",
  key: "major-cowardice",
  description: "Reduces Weapon and Spell Damage by 430",
  effects: "jsonl",
} as const satisfies TemperDebuffMajor
