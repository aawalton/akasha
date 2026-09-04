import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonDependencyFloor = {
  id: "01a06297-7f6a-7664-ac3d-ea7ecf537e2f",
  pageTypeSlug: "module",
  slug: "addon-dependency-floor",
  definition: "whether a version floor a game add-on declares is met by what ships",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A bare provider name declares no floor and is not judged.",
    },
    {
      invariantKind: "constraint",
      statement: "A constraint that is no lower bound is not judged.",
    },
    {
      invariantKind: "constraint",
      statement: "A provider outside the fleet cannot be judged.",
    },
    {
      invariantKind: "constraint",
      statement: "What is not judged is counted and reported.",
    },
  ],
} as const satisfies Module
