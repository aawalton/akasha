import type { Module } from "@akasha/code-system/module"

export const navIconSvg = {
  id: "01a0640f-8510-721d-88b0-b37b2bda4681",
  pageTypeSlug: "module",
  slug: "nav-icon-svg",
  definition: "a navigation icon drawn as svg text",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An icon name the set does not carry is drawn as a page of text.",
    },
    {
      invariantKind: "departure",
      statement: "Every attribute value is escaped before the value reaches the markup.",
    },
    {
      invariantKind: "departure",
      statement: "An icon is loaded only when the icon is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "How heavy a stroke a site draws its icons with is passed in.",
    },
  ],
} as const satisfies Module
