import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const esoOptInList = {
  id: "01a081b0-6ef0-79f7-8191-4b78fb717423",
  type: "page-type/page-type",
  slug: "eso-opt-in-list",
  definition: "the eso api tokens chosen to be declared",
  parts: ["file-property/tokens"],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "file-property/tokens", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-08T15:43:38.736Z",
  updatedAt: "2026-09-21T14:15:52.000Z",
} as const satisfies PageType
