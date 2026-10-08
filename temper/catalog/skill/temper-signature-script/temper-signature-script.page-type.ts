import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSignatureScript = {
  id: "01a05fca-cb8a-7514-8c96-15d014bc0d9a",
  type: "page-type/page-type",
  slug: "temper-signature-script",
  definition: "the script naming the turn a scribed skill takes",
  extends: ["page-type/temper-script"],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
  createdAt: "2026-09-02T01:45:21.034Z",
  updatedAt: "2026-09-26T18:55:59.000Z",
} as const satisfies PageType
