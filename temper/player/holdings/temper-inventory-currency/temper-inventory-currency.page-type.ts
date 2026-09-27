import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperInventoryCurrency = {
  id: "01a05fcb-fd2c-79e2-b426-908dcfb8bf4a",
  type: "page-type/page-type",
  slug: "temper-inventory-currency",
  definition: "a kind of money an account holds",
  extends: ["page-type/temper-thing"],
  parts: ["text-property/eso-currency-constant", "boolean-property/bankable"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-currency-constant", required: false, many: false },
    { pageProperty: "boolean-property/bankable", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The addon tracks a currency only where its page names the game's constant for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The addon reads a currency from the bank only where its page says it is bankable.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
