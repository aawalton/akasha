import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSignatureScript = {
  id: "01a05fca-cb8a-7514-8c96-15d014bc0d9a",
  type: "page-type/page-type",
  slug: "temper-signature-script",
  definition: "the script naming the turn a scribed skill takes",
  extends: ["page-type/temper-script"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
