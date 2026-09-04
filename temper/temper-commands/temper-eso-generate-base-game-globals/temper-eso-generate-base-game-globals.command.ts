import type { Command } from "@akasha/command-system/command"

export const temperEsoGenerateBaseGameGlobals = {
  id: "01a0685d-f8fa-7913-8b39-8d1f9f835d34",
  pageTypeSlug: "command",
  slug: "temper-eso-generate-base-game-globals",
  definition: "the command staging the census of the string ids the base game provides",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--eso-root <path>",
      takes: "the game's Lua source root, the `~/esoui` clone where none is said",
    },
    {
      said: "--code-root <path>",
      takes:
        "the checkout the census is staged against, for the page ids and bodies already standing",
    },
    {
      said: "--stage <path>",
      takes:
        "the directory the bodies are staged in, a fresh one under /var/tmp where none is said",
    },
  ],
  helpNotes: [
    "the scan takes every top-level global assignment matching the game's naming convention and unions every `SI_` string id the source mentions.",
    "a string id is declared rather than assigned, so an assignment scan alone reaches only part of the set and the mention scan is what finds the rest.",
    "only the string ids cross. The scan sees about twenty-one thousand base-game names and the census keeps the thirteen thousand `SI_` ones, because the one consumer asks the census one question: whether a string id an addon's markup consumes at parse time is provided by the base game.",
    "keeping the other names would stand a second, wider name authority beside the curated one, and the two would contradict each other by construction.",
    "one file of the whole census is many times the fifteen thousand byte akasha ceiling, so it is written as numbered runs with an aggregate composing them, and how many digits a run's ordinal carries follows from how many runs there are.",
    "nothing lands here. The bodies are staged outside akasha and the writing call that lands them is named, because that call is what judges them against the checks and commits them.",
    "a run whose body already stands is not staged, so a scan finding the same names stages nothing.",
    "a clone holding no string id refuses the call, because an empty census reads to every consumer as a clean answer.",
    "the workspace-package page's part slugs are not written here, so a run changing how many runs there are leaves that list wanting a hand.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A string id is found by mention as well as by assignment.",
    },
    {
      invariantKind: "departure",
      statement: "Only the string ids cross into the census.",
    },
    {
      invariantKind: "departure",
      statement: "The census is written as numbered runs with an aggregate composing them.",
    },
    {
      invariantKind: "departure",
      statement: "A run whose body already stands is not staged again.",
    },
    {
      invariantKind: "departure",
      statement: "A clone holding no string id refuses the call.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing lands here; the writing call that lands the staged bodies is named instead.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the clone.",
    },
    {
      invariantKind: "gap",
      statement: "The run count and the workspace-package page's part slugs are written together.",
    },
  ],
} as const satisfies Command
