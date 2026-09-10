import type { PageType } from "@akasha/pages/page-type"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"
import type { Tab } from "./properties/tab.text-property.ts"

export type TemperCompletionCategory = TemperProgressThing & {
  tab: Tab
}

export const temperCompletionCategory = {
  id: "01a05fcb-d657-7209-8fac-d33d57fe464e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-completion-category",
  definition: "one node of the tree completion is counted in",
  pluralSlug: "temper-completion-categories",
  extends: ["page-type/temper-progress-thing"],
  parts: ["text-property/tab"],
  properties: [
    { pageProperty: "text-property/node-id", required: true, many: false },
    { pageProperty: "text-property/tab", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A node stating no parent is a root of the tree.",
    },
    {
      invariantKind: "departure",
      statement: "Every root is named by the tab the root heads.",
    },
    {
      invariantKind: "departure",
      statement: "A node has the tab of the root the node hangs beneath.",
    },
  ],
} as const satisfies PageType
