import type { Domain } from "@akasha/domains/domain"

export const testFixture = {
  id: "01a04f3e-eea5-7c4e-a36d-40a390ffd6ef",
  pageTypeSlug: "domain",
  slug: "test-fixture",
  definition: "the world a test is given to sit in",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fixture has the page that fixture needs rather than restating its values.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture invents a page only where no page represents the thing the test needs.",
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
        "Invent a page only where none stands for what the test needs.",
        "A fixture missing what the code derives from answers empty rather than wrong.",
      ],
    },
  ],
} as const satisfies Domain
