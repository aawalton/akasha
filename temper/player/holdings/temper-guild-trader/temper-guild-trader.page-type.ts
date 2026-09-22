import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperGuildTrader = {
  id: "01a05fcb-fd2c-7cff-9144-3d6612a42fa5",
  type: "page-type/page-type",
  slug: "temper-guild-trader",
  definition: "a kiosk a guild rents for its sales",
  extends: ["page-type/temper-thing"],
  parts: ["number-property/kiosk-id"],
  properties: [{ pageProperty: "number-property/kiosk-id", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
