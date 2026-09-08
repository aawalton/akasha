import type { Module } from "@akasha/code/module"

export const addonsBundleDir = {
  id: "01a0640f-850f-76fa-aa1c-8817cc184e55",
  pageTypeSlug: "module",
  slug: "addons-bundle-dir",
  definition: "the folder the built addon bundles are served out of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder named relative is taken against the folder the server runs in.",
    },
    {
      invariantKind: "departure",
      statement: "The folder is read from the environment once, when this module loads.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change to the environment after this module has loaded does not move the folder.",
    },
  ],
} as const satisfies Module
