import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperRace = {
  id: "01a05fc4-7a95-7a17-b702-bdb4627956d0",
  type: "page-type/page-type",
  slug: "temper-race",
  definition: "a character's own people",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-race-id", "text-property/alt-name"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/alt-name", required: false, many: false },
    { pageProperty: "number-property/eso-race-id", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
