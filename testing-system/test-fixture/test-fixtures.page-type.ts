import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const testFixtures = {
  id: "01a09c17-9d01-7f25-b06d-5521c1acc95d",
  type: "page-type",
  slug: "test-fixtures",
  definition: "the world more than one module's tests are set up with",
  pluralSlug: "test-fixtures",
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/code", required: true, many: false },
    { pageProperty: "code-file-property/test", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fixture holds what a test is set up with rather than what a test proves.",
    },
    {
      invariantKind: "departure",
      statement: "The scaffolding one module's tests alone need sits beside that module instead.",
    },
    {
      invariantKind: "departure",
      statement: "A test or another fixture is what reaches a fixture.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture's own test proves the fixture rather than the system.",
    },
    {
      invariantKind: "absence",
      statement: "A fixture holds no fixtures of its own.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing catches a fixture nothing but fixtures' own tests reach.",
    },
  ],
  types: "ts",
} as const satisfies PageType
