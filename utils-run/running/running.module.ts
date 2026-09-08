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
      statement: "How a process ended is spelled once here as a code or as a signal.",
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
      statement: "A process inherits the environment of its caller.",
    },
    {
      invariantKind: "departure",
      statement: "An environment stated replaces the environment inherited.",
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
      statement: "A process is answered with the processor seconds that process spent.",
    },
    {
      invariantKind: "departure",
      statement: "Those seconds carry what the process's own children spent.",
    },
    {
      invariantKind: "departure",
      statement: "A process the kernel reported no usage for is answered as having spent none.",
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
      invariantKind: "departure",
      statement: "A caller may give a process a ceiling in processor seconds.",
    },
    {
      invariantKind: "departure",
      statement: "The kernel ends a process reaching its ceiling rather than a reader noticing.",
    },
    {
      invariantKind: "departure",
      statement: "A process ended at its ceiling is answered as having died on a signal.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling is whole seconds, and a fraction is taken up to the next second.",
    },
    {
      invariantKind: "departure",
      statement: "A process given no ceiling runs to its own end.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a process meant to outlive its caller.",
    },
  ],
} as const satisfies Module
