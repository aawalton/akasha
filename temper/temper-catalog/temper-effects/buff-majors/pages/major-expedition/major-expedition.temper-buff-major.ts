import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorExpedition = {
  id: "01a05fc5-f6b8-76fe-a2ed-ed6749cdb7e9",
  pageTypeSlug: "temper-buff-major",
  slug: "major-expedition",
  title: "Major Expedition",
  key: "major-expedition",
  description: "Increases movement speed by 30%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
