import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonRemovedRefsManifest = {
  id: "01a06365-e827-7003-af97-b8511950c909",
  pageTypeSlug: "module",
  slug: "addon-removed-refs-manifest",
  definition: "the globals of third-party add-ons this suite no longer depends on",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Every global named here states the add-on the global belonged to.",
    },
    {
      invariantKind: "constraint",
      statement: "Every global named here states what took the removed add-on's place.",
    },
  ],
} as const satisfies Module
