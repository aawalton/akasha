import type { Command } from "@akasha/command-system/command"

export const temperAddonBundleBuild = {
  id: "01a0603c-c1c8-7743-9bce-0b5a120c9b40",
  pageTypeSlug: "command",
  slug: "temper-addon-bundle-build",
  definition: "the command packing every distributable addon's build output into one archive",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--sha <commit-sha>",
      takes: "the commit written into the version file the installer compares against",
    },
    { said: "--out <path>", takes: "where the archive and the version file are written" },
    { said: "--code-root <path>", takes: "the checkout packed from" },
  ],
  helpNotes: [
    "nothing is compiled here, and an addon whose build output is empty refuses the call rather than being left out.",
    "every addon on the roster is packed whether or not anything depends on it, along with each sibling folder a manifest declares.",
    "a dependency the roster does not hold is one the player installs themselves, and it is reported rather than packed.",
    "entry timestamps are fixed, so two runs over one build output give the same bytes.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is packed is the build output already written.",
    },
    {
      invariantKind: "departure",
      statement: "An addon with no build output refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "Every addon on the roster is packed.",
    },
    {
      invariantKind: "departure",
      statement: "A sibling folder a manifest declares is packed with its addon.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency the roster does not hold is reported rather than packed.",
    },
    {
      invariantKind: "departure",
      statement: "Two runs over one build output give the same bytes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here compiles an addon.",
    },
  ],
} as const satisfies Command
