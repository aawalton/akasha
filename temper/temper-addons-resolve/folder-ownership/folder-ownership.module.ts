import type { Module } from "@akasha/code-system/module"

export const folderOwnership = {
  id: "01a06060-ec3f-739d-a84d-9007047669a6",
  pageTypeSlug: "module",
  slug: "folder-ownership",
  definition: "whether a folder in the game's addons directory is the deploy's to replace",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder the deploy wrote carries a marker file the deploy put there.",
    },
    {
      invariantKind: "departure",
      statement: "A folder carrying the marker is replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A folder that is not there is installed into.",
    },
    {
      invariantKind: "departure",
      statement: "A folder somebody else wrote is left alone where its version is high enough.",
    },
    {
      invariantKind: "departure",
      statement: "A folder somebody else wrote is refused where its version is too low.",
    },
    {
      invariantKind: "departure",
      statement: "A folder whose version could not be read is refused rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A folder nothing could read is refused rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A floor is read only from a dependency naming the addon being weighed.",
    },
  ],
} as const satisfies Module
