import type { Module } from "@akasha/code-system/module"

export const libSetsTipDropMechanicRenderPart = {
  id: "01a06231-8f1e-7196-8b24-736224602b2a",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-drop-mechanic-render-part",
  definition: "the one-zone piece of drop text with its mechanics and boss names in brackets",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "Which pieces appear follows the tooltip settings unless the text is not for a tooltip.",
    },
    { invariantKind: "departure", statement: "The zone name is tinted grey." },
  ],
} as const satisfies Module
