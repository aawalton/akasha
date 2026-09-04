import type { Module } from "@akasha/code-system/module"

export const esoCloneStamp = {
  id: "01a06050-639f-76e4-94da-ea05355aa7da",
  pageTypeSlug: "module",
  slug: "eso-clone-stamp",
  definition: "the marker a file generated from the game's source clone carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generated file states the command that regenerates that file.",
    },
    {
      invariantKind: "departure",
      statement: "A generated file states the API version its source clone was at.",
    },
    {
      invariantKind: "departure",
      statement: "The clone's API version is read from the documentation's own header line.",
    },
    {
      invariantKind: "departure",
      statement: "A regenerating command is written on one line.",
    },
    {
      invariantKind: "departure",
      statement: "A file carrying no marker reads as unstamped rather than as stale.",
    },
    {
      invariantKind: "departure",
      statement: "Documentation carrying no header line is refused rather than stamped from.",
    },
  ],
} as const satisfies Module
