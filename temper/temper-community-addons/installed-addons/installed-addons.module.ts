import type { Module } from "@akasha/code-system/module"

export const installedAddons = {
  id: "01a06069-b78f-7051-8fb2-ebe10b403037",
  pageTypeSlug: "module",
  slug: "installed-addons",
  definition: "what the game's addons directory holds, each folder with the version it states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder is one addon.",
    },
    {
      invariantKind: "departure",
      statement: "A file in the addons directory is no addon.",
    },
    {
      invariantKind: "departure",
      statement: "A version is read from the manifest named for the folder holding that manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest is looked for as `.txt` before `.addon`.",
    },
    {
      invariantKind: "departure",
      statement: "A folder whose manifest cannot be read states no version.",
    },
    {
      invariantKind: "departure",
      statement: "The folders are answered in sorted order.",
    },
  ],
} as const satisfies Module
