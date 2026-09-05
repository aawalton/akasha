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
      statement: "Each stream a process says on is taken whole.",
    },
    {
      invariantKind: "departure",
      statement: "A code other than zero is answered as data.",
    },
    {
      invariantKind: "departure",
      statement: "A process ending on a signal is answered as `-1` and the name of that signal.",
    },
    {
      invariantKind: "departure",
      statement: "A process ending on a code of its own is answered as naming no signal.",
    },
    {
      invariantKind: "departure",
      statement: "How a process ended is spelled once here, as a code or as a signal.",
    },
    {
      invariantKind: "departure",
      statement: "A throw says how the process ended rather than a code alone.",
    },
    {
      invariantKind: "departure",
      statement: "A caller wanting a throw asks for the streams rather than how the process ran.",
    },
    {
      invariantKind: "departure",
      statement: "A process inherits the environment of the one that started that process.",
    },
    {
      invariantKind: "departure",
      statement: "An environment stated replaces the one inherited.",
    },
    {
      invariantKind: "departure",
      statement: "A process's output stream is answered as bytes where bytes are asked for.",
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
