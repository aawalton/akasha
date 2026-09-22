import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonsBundleDir = {
  id: "01a0640f-850f-76fa-aa1c-8817cc184e55",
  type: "page-type/module",
  slug: "addons-bundle-dir",
  definition: "the folder of the built addon bundles",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder named relative is taken against the folder the server runs in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder is read from the environment once when this module loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change to the environment after this module has loaded does not move the folder.",
    },
  ],
} as const satisfies Module
