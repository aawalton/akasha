import type { Domain } from "@akasha/domain-system/domain"

export const testFixture = {
  id: "01a04f3e-eea5-7c4e-a36d-40a390ffd6ef",
  pageTypeSlug: "domain",
  slug: "test-fixture",
  definition: "the world a test is given to stand in",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fixture carries the page it needs rather than restating its values.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture invents a page only where no page stands for what the test needs.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture stands in a world the system could have built.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing says a fixture has fallen behind the system it feeds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A system reading what the pages declare refuses a world declaring no property unique.",
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
        "Invent a page only where none stands for what the test needs.",
        "A fixture missing what the code derives from answers empty rather than wrong.",
      ],
    },
  ],
} as const satisfies Domain
