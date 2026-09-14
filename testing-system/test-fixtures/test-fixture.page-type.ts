import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const testFixture = {
  id: "01a09c17-9d01-7f25-b06d-5521c1acc95d",
  type: "page-type",
  slug: "test-fixture",
  definition: "the world more than one module's tests are set up with",
  pluralSlug: "test-fixtures",
  parts: [
    "test-fixture/declaring",
    "test-fixture/minting",
    "test-fixture/page-holding",
    "test-fixture/repo-seeding",
    "test-fixture/waiting",
    "test-fixture/walking",
  ],
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
      invariantKind: "departure",
      statement: "A fixture nothing but fixtures' own tests reach is unused code.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture has the page that fixture needs rather than restating its values.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture invents a page only where no page represents what the test needs.",
    },
    {
      invariantKind: "departure",
      statement: "A page a fixture invents has a slug no page in the tree has.",
    },
    {
      invariantKind: "absence",
      statement:
        "A fixture stating the values of a page it does not import has nothing keeping the two alike.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture sits in a world the system could have built.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing says a fixture has fallen behind the system that fixture feeds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A system reading the pages' declarations refuses a world declaring no property unique.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Carry The Real Page",
      act: "Import the page a fixture needs into the fixture tree rather than restating its values.",
      warrant:
        "A restated page falls behind what the pages declare, and every test keeps passing while it does.",
      aids: [
        "A page is a module, so a fixture can import it.",
        "Invent a page only where none represents what the test needs.",
        "A fixture missing what the code derives from answers empty rather than wrong.",
      ],
    },
  ],
  types: "ts",
} as const satisfies PageType
