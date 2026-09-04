import type { Module } from "@akasha/code-system/module"

export const hudAddonEntry = {
  id: "01a061c5-18dd-7010-a74b-7e1a0ac8f751",
  pageTypeSlug: "module",
  slug: "hud-addon-entry",
  definition: "what the HUD add-on does once the game has loaded that add-on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The saved variables are opened before anything reads the saved variables.",
    },
    {
      invariantKind: "departure",
      statement: "The global is published before the game finishes loading the add-on.",
    },
    {
      invariantKind: "departure",
      statement: "The session is started again on the first player activation of a login.",
    },
  ],
} as const satisfies Module
