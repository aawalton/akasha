import type { Module } from "@akasha/code-system/module"

export const installNamedAddon = {
  id: "01a06069-b790-7f2c-a237-0a215f888c46",
  pageTypeSlug: "module",
  slug: "install-named-addon",
  definition: "one addon named by hand, looked up on ESOUI and laid into the addons directory",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is matched against the ESOUI title or against an install folder.",
    },
    {
      invariantKind: "departure",
      statement: "A name matching nothing on ESOUI is refused as bad input.",
    },
    {
      invariantKind: "departure",
      statement: "An entry naming no install folder is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "An entry installing a folder the deploy owns is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Forcing is consent to install a third-party addon again.",
    },
    {
      invariantKind: "absence",
      statement: "Forcing is no consent to drop an archive over a folder the deploy owns.",
    },
    {
      invariantKind: "departure",
      statement: "An addon whose every folder is already there is skipped unless forced.",
    },
    {
      invariantKind: "departure",
      statement: "An archive carrying no folder the caller expected is refused.",
    },
  ],
} as const satisfies Module
