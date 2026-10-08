import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperFocusScript = {
  id: "01a05fca-cb89-7c54-89c6-5392b871f29f",
  type: "page-type/page-type",
  slug: "temper-focus-script",
  definition: "the script naming what a scribed skill does",
  extends: ["page-type/temper-script"],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
  createdAt: "2026-09-02T01:45:21.033Z",
  updatedAt: "2026-09-26T18:55:59.000Z",
} as const satisfies PageType
