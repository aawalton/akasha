import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorForce = {
  id: "01a05fc5-f6b9-7f4b-8028-9e85561d13c5",
  pageTypeSlug: "temper-buff-major",
  slug: "major-force",
  title: "Major Force",
  key: "major-force",
  description: "Increases Critical Damage by 20%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
