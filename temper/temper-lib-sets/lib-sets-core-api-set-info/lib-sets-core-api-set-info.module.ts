import type { Module } from "@akasha/code-system/module"

export const libSetsCoreApiSetInfo = {
  id: "01a06231-8f1d-7816-b46e-caba9de72027",
  pageTypeSlug: "module",
  slug: "lib-sets-core-api-set-info",
  definition: "everything known about one set gathered into a single table",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "Set data asked for in one language and without item ids is cached for later asks.",
    },
  ],
} as const satisfies Module
