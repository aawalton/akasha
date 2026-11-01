import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const buildInterfaces = {
  id: "01a1989e-af97-7ff6-896d-23361634b122",
  type: "page-type/multi-relation-property",
  slug: "build-interfaces",
  propertySlug: "build-interfaces",
  definition: "the build interfaces a build includes",
  targetPageType: "page-type/build-interface",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build holds everything its interfaces hold, and may hold more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build's own choice wins where it adds, never where it leaves out.",
    },
  ],
  types: "ts",
  createdAt: "2026-11-01T19:38:18.901Z",
  updatedAt: "2026-11-01T19:38:18.901Z",
} as const satisfies MultiRelationProperty
