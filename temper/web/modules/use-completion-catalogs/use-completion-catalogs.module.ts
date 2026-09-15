import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCompletionCatalogs = {
  id: "01a06421-f74b-780d-8790-490781880039",
  type: "module",
  slug: "use-completion-catalogs",
  definition: "the catalogs a completion tab reads its totals from",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A catalog changes when the game does rather than while a reader is looking.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A catalog is asked for once a browser session and held in this module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A navigation inside the app reuses the held catalogs rather than asking again.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "`/ask` is a POST.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "No HTTP cache would have held a catalog.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The row ceiling is well above the largest catalog.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The largest catalog has 311 rows.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The store answers a page's declared keys under both spellings.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The store stamps an entry with an id the catalog types do not name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Narrowing a row to the keys named makes the assertion true.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Narrowing a row keeps the row small.",
    },
  ],
} as const satisfies Module
