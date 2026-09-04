import type { Command } from "@akasha/command-system/command"

export const temperAddonCopyMetadata = {
  id: "01a0603c-c1c9-7aeb-a484-f4b4517ed141",
  pageTypeSlug: "command",
  slug: "temper-addon-copy-metadata",
  definition:
    "the command copying an addon's manifest, markup, assets and siblings into its build output",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--addon <name>", takes: "the addon whose metadata is copied" },
    { said: "--code-root <path>", takes: "the checkout read and written" },
  ],
  helpNotes: [
    "the load order is written first, then every non-Lua file the addon ships is copied.",
    "naming no addon is refused rather than answered with a default, since a default would overwrite one particular addon's build output.",
    "an addon whose named markup file is absent gets an empty one written, because the game reads a named file rather than an optional one.",
    "a declared sibling folder that is missing refuses the call rather than being skipped.",
    "everything written is build output that no commit carries.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming no addon is refused rather than answered with a default.",
    },
    {
      invariantKind: "departure",
      statement: "The load order is written before anything is copied.",
    },
    {
      invariantKind: "departure",
      statement: "An absent markup file is written empty.",
    },
    {
      invariantKind: "departure",
      statement: "A declared sibling folder that is missing refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout written into is named on the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing written here is carried by a commit.",
    },
  ],
} as const satisfies Command
