import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperAffixScript = {
  id: "01a05fca-cb89-788f-9f0a-64f49f04b8a8",
  type: "page-type/page-type",
  slug: "temper-affix-script",
  definition: "the script naming the bonus a scribed skill grants",
  extends: ["page-type/temper-script"],
  types: "ts",
  schema: "jsonl",
  parts: [],
  properties: [],
  hashIndexed: ["hashPlace"],
  createdAt: "2026-09-02T01:45:21.033Z",
  updatedAt: "2026-09-26T18:55:59.000Z",
} as const satisfies PageType
