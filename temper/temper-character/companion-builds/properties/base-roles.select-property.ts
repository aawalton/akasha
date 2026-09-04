import type { SelectProperty } from "@akasha/pages-system/select-property"

export const baseRoles = {
  id: "01a06862-c4ee-780f-ab05-93eb2cdb2991",
  pageTypeSlug: "select-property",
  slug: "base-roles",
  propertySlug: "base-roles",
  definition: "the parts a companion build is arranged to play",
  values: ["tank", "healer"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build arranged for no part names none.",
    },
  ],
} as const satisfies SelectProperty

export type BaseRole = (typeof baseRoles.values)[number]
