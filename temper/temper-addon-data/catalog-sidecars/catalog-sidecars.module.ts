import type { Module } from "@akasha/code-system/module"

export const catalogSidecars = {
  id: "01a06369-1e85-7d20-90a9-a624c0c3695e",
  pageTypeSlug: "module",
  slug: "catalog-sidecars",
  definition: "the rows a catalog page carries, turned into the shape a generator reads",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rows of a property arrive on the page carrying the rows.",
    },
    {
      invariantKind: "departure",
      statement: "A row reaches its page in the order the page carries the row.",
    },
    {
      invariantKind: "departure",
      statement:
        "A field is read under either spelling a markdown row and an akasha page give the field.",
    },
    {
      invariantKind: "departure",
      statement: "An effect row carried whole drops the row's own id.",
    },
    {
      invariantKind: "departure",
      statement: "An effect row carried whole is renamed in two fields and left alone in the rest.",
    },
    {
      invariantKind: "departure",
      statement: "The order a row states its fields in is the order the table carries the fields.",
    },
    {
      invariantKind: "departure",
      statement: "A projection keeps the order the rows are read in.",
    },
    {
      invariantKind: "departure",
      statement: "A jewelry trait names a metric only where the trait's values split by metric.",
    },
    {
      invariantKind: "departure",
      statement: "A page holding no rows of a property answers the empty table its shape declares.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming a property nowhere answers whatever that property's carry says.",
    },
    {
      invariantKind: "departure",
      statement: "An empty list is not the same fact as no list.",
    },
    {
      invariantKind: "departure",
      statement: "A page type carrying no rows is answered unchanged.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here looks a row up and nothing here joins a row.",
    },
  ],
} as const satisfies Module
