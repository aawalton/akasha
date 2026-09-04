import type { Module } from "@akasha/code-system/module"

export const deployableAddons = {
  id: "01a06060-ec3e-76a0-91e2-ff4014f8a701",
  pageTypeSlug: "module",
  slug: "deployable-addons",
  definition: "the addons a deploy can carry, each with what that addon needs built first",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The addons are answered in the order their canonical names sort.",
    },
    {
      invariantKind: "departure",
      statement: "A roster handed in is taken as the answer to what the repository holds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether an addon is fit to deploy.",
    },
  ],
} as const satisfies Module
