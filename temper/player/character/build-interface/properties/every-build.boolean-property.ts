import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const everyBuild = {
  id: "01a198b2-79bb-7ba3-a171-0cbe28fcdd17",
  type: "page-type/boolean-property",
  slug: "every-build",
  propertySlug: "every-build",
  definition: "whether every build includes a build interface without naming it",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build made later includes such an interface as a build made now does.",
    },
  ],
  types: "ts",
  createdAt: "2026-11-01T19:59:55.834Z",
  updatedAt: "2026-11-01T19:59:55.834Z",
} as const satisfies BooleanProperty
