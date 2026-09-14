import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const landingAdmission = {
  id: "01a0a0af-184c-7bcb-bcd1-77847f24260e",
  type: "module",
  slug: "landing-admission",
  definition: "the turn a landing waits for, and the memory the workstation keeps free to give it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A landing starts only where it holds the turn.",
    },
    {
      invariantKind: "constraint",
      statement: "Eight gigabytes available is the least a landing starts on.",
    },
    {
      invariantKind: "departure",
      statement:
        "The turn is held thirty seconds, so the next landing reads what the last one took.",
    },
    {
      invariantKind: "departure",
      statement: "What is available is what the kernel says, rather than what is unused.",
    },
    {
      invariantKind: "departure",
      statement: "A landing the workstation has no room for waits rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A turn is taken under a lock, so two landings never read the same free memory.",
    },
    {
      invariantKind: "departure",
      statement: "A turn expires on its own, so a run that died holding one stops nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A least read from the environment is used in place of the least stated here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts what memory a landing is about to take.",
    },
  ],
} as const satisfies Module
