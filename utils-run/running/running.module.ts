import type { Module } from "../../code-system/modules/module.page-type.ts"

export const running = {
  id: "01a05d20-8007-70bf-8ed6-29cc7dfb4687",
  pageTypeSlug: "module",
  slug: "running",
  definition: "a process run to its end, and the code and streams it leaves",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A process is named by a list holding the command and its arguments.",
    },
    {
      invariantKind: "departure",
      statement: "What a process says on each stream is taken whole.",
    },
    {
      invariantKind: "departure",
      statement: "A code other than zero is answered as data.",
    },
    {
      invariantKind: "departure",
      statement: "A process ending on a signal rather than a code of its own is answered as `-1`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller wanting a throw asks for what the process said rather than how the process ran.",
    },
    {
      invariantKind: "departure",
      statement: "A process inherits the environment of the one that started it.",
    },
    {
      invariantKind: "departure",
      statement: "An environment stated replaces the one inherited.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a process says on its output stream is answered as bytes where bytes are asked for.",
    },
    {
      invariantKind: "departure",
      statement: "Text is those bytes read as text rather than a second run.",
    },
    {
      invariantKind: "departure",
      statement: "A process run to be watched writes to the streams its caller was given.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing a watched process said is carried back.",
    },
    {
      invariantKind: "absence",
      statement: "No shell comes between a caller and the process the caller starts.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a process meant to outlive its caller.",
    },
  ],
} as const satisfies Module
