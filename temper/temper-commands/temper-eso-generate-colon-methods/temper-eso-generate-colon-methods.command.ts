import type { Command } from "@akasha/command-system/command"

export const temperEsoGenerateColonMethods = {
  id: "01a0685d-f8fa-7dc8-bf64-5a62864e6dbb",
  pageTypeSlug: "command",
  slug: "temper-eso-generate-colon-methods",
  definition: "the command staging the census of the method names the base game defines on a class",
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
    "the scan takes every method the source defines on a class, and the census is the distinct names rather than the receivers.",
    "nothing reads this census today, which is why it does not stand in akasha. It answered receiver provenance for two checks over the Lua compiler that did not cross, and this command is the rule the census would be made by, kept standing so a consumer arriving again has one.",
    "one file of the whole census is many times the fifteen thousand byte akasha ceiling, so it is written as numbered runs with an aggregate composing them, and how many digits a run's ordinal carries follows from how many runs there are.",
    "nothing lands here. The bodies are staged outside akasha and the writing call that lands them is named, because that call is what judges them against the checks and commits them.",
    "landing them puts about twelve thousand method names into the tree that nothing asks a question of, so land them when a consumer arrives rather than before.",
    "a clone holding no such method refuses the call, because an empty census reads to every consumer as a clean answer.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The census is names rather than receivers.",
    },
    {
      invariantKind: "departure",
      statement: "The census is written as numbered runs with an aggregate composing them.",
    },
    {
      invariantKind: "departure",
      statement: "A clone holding no colon-method refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The command stands while nothing reads what it would make.",
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
      statement: "A check reads this census.",
    },
  ],
} as const satisfies Command
