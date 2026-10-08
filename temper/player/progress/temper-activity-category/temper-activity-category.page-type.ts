import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperActivityCategory = {
  id: "01a05fc9-9a01-773d-b715-ed0cbfa91604",
  type: "page-type/page-type",
  slug: "temper-activity-category",
  definition: "a sort of thing there is to do in the game",
  extends: ["page-type/temper-progress-thing"],
  parts: ["relation-property/activity-category", "text-property/badge-variant"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/badge-variant", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:44:02.817Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies PageType
