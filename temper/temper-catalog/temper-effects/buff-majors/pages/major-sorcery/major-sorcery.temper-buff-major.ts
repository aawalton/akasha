import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorSorcery = {
  id: "01a05fc5-f6bc-7edc-a10c-5353f828d187",
  pageTypeSlug: "temper-buff-major",
  slug: "major-sorcery",
  title: "Major Sorcery",
  key: "major-sorcery",
  description: "Increases Spell Damage by 20%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
