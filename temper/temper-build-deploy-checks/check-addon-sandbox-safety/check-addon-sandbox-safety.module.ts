import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkAddonSandboxSafety = {
  id: "01a06365-e827-7007-b638-ed3fec2ee814",
  pageTypeSlug: "module",
  slug: "check-addon-sandbox-safety",
  definition: "the run judging whether an emitted bundle names a symbol the game strips",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The population the run states is the emitted bundles under the build output.",
    },
    {
      invariantKind: "constraint",
      statement: "A bundle examined is a bundle whose text was read.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty build output ends the run rather than passing the run.",
    },
    {
      invariantKind: "constraint",
      statement: "A bundle that could not be read ends the run with what was read so far named.",
    },
  ],
} as const satisfies Module
