import type { Command } from "@akasha/command-system/command"

export const temperAddonGenerateLoadOrder = {
  id: "01a0603c-c1c9-7ee8-bee7-dc59bf99a048",
  pageTypeSlug: "command",
  slug: "temper-addon-generate-load-order",
  definition:
    "the command writing an addon's load-order manifest and build stamp into its build output",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--addon <name>", takes: "the addon a load order is written for" },
    { said: "--code-root <path>", takes: "the checkout read and written" },
  ],
  helpNotes: [
    "the manifest is what the game reads to decide what to load and in what order.",
    "naming no addon is refused rather than answered with a default, since a default would overwrite one particular addon's build output.",
    "the catalog addon alone takes its api version from the pages system rather than from its own declaration.",
    "that version is the lowest any active catalog domain declares its generator last ran for.",
    "both written files are build output that no commit carries.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming no addon is refused rather than answered with a default.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest is written from the addon's own declaration.",
    },
    {
      invariantKind: "departure",
      statement: "The catalog addon takes its api version from the pages system.",
    },
    {
      invariantKind: "departure",
      statement: "That version is the lowest any active catalog domain last ran for.",
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
