import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const baseRoles = {
  id: "01a06862-c4ee-780f-ab05-93eb2cdb2991",
  type: "page-type/select-property",
  slug: "base-roles",
  propertySlug: "base-roles",
  definition: "the parts a companion build is arranged to play",
  values: ["tank", "healer"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build arranged for no part names none.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
