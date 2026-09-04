import type { Module } from "@akasha/code-system/module"

export const addonRoster = {
  id: "01a06060-ec3e-72ca-8583-d3120bbc8269",
  pageTypeSlug: "module",
  slug: "addon-roster",
  definition: "every addon the repository holds, each with the packages that addon reaches",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon under `temper/addons` is found by reading that folder.",
    },
    {
      invariantKind: "departure",
      statement: "An addon elsewhere is found by walking the workspaces the root manifest names.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no addon manifest of either spelling is no addon.",
    },
    {
      invariantKind: "departure",
      statement: "An addon stating no name is named for the folder holding that addon.",
    },
    {
      invariantKind: "departure",
      statement: "An addon is reached by canonical name or by the name of its own folder.",
    },
    {
      invariantKind: "departure",
      statement: "An addon outside `temper/addons` is reached by its parent folder's name too.",
    },
    {
      invariantKind: "departure",
      statement: "A name matching no addon answers as a folder under `temper/addons`.",
    },
  ],
} as const satisfies Module
