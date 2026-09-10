import type { PageType } from "@akasha/pages/page-type"

export const characterBuild = {
  id: "01a06835-fae8-7243-8c39-219aa5e07daf",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "character-build",
  definition: "one saved arrangement of a character's gear, skills and stats",
  pluralSlug: "character-builds",
  extends: ["page-type/temper-character-thing"],
  parts: [
    "number-property/build-target-count",
    "select-property/build-visibility",
    "text-property/build-correlation-id",
  ],
  properties: [
    { pageProperty: "text-property/build-hash", required: true, many: false },
    { pageProperty: "select-property/build-visibility", required: true, many: false },
    { pageProperty: "text-property/build-correlation-id", required: false, many: false },
    { pageProperty: "number-property/build-target-count", required: false, many: false },
    {
      pageProperty: "relation-property/character-roles",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A build is the arrangement itself rather than the character wearing that arrangement.",
    },
    {
      invariantKind: "departure",
      statement: "One character has many builds.",
    },
    {
      invariantKind: "departure",
      statement: "One build is shared across characters.",
    },
    {
      invariantKind: "departure",
      statement: "Two builds arranged alike carry one hash.",
    },

    {
      invariantKind: "departure",
      statement: "This page type is Temper's while its slug has no temper- prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A build's name is its title rather than a second field saying the same.",
    },
  ],
  types: "ts",
} as const satisfies PageType
