import type { PageType } from "@akasha/pages/page-type"

export const temperCompanionThing = {
  id: "01a05fcc-694c-762c-bcd1-1691361636e2",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-thing",
  definition: "anything the companion side of the catalog keeps a page for",
  pluralSlug: "temper-companion-things",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/equip-type"],
  properties: [{ pageProperty: "number-property/equip-type", required: false, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every place a companion wears a thing is named by one number.",
    },
  ],
  types: "ts",
} as const satisfies PageType
