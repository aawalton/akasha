import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const running = {
  id: "01a05d20-8007-70bf-8ed6-29cc7dfb4687",
  type: "module",
  slug: "running",
  definition: "a process run to its end, and the code and streams it leaves",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A process is named by a list with the command and its arguments.",
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
      statement: "A process is answered with the peak memory that process reached.",
    },
    {
      invariantKind: "departure",
      statement: "That peak is the highest the process and the children it waited on ever held.",
    },
    {
      invariantKind: "departure",
      statement: "The kernel counts that peak in kilobytes and a caller is answered in bytes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process the kernel reported no usage for is answered as having reached no peak.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process given no ceiling is answered the seconds that process and its reaped children spent.",
    },
    {
      invariantKind: "departure",
      statement: "A bounded process is answered the seconds its ceiling is judged against.",
    },
    {
      invariantKind: "departure",
      statement:
        "Those seconds have every process in the group rather than the ones the run reaped.",
    },
    {
      invariantKind: "departure",
      statement: "The group's seconds are read before the group is taken away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process the kernel reported no usage for is answered as having spent no seconds.",
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
      statement: "A process ended at its ceiling is answered as having died on a signal.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling bounds a process together with everything that process starts.",
    },
    {
      invariantKind: "departure",
      statement: "A process given a ceiling runs in a control group made for that one run.",
    },
    {
      invariantKind: "departure",
      statement: "That group is made under the nearest ancestor group this run may write in.",
    },
    {
      invariantKind: "departure",
      statement:
        "An ancestor group is written in only where processor time is delegated to that group.",
    },
    {
      invariantKind: "departure",
      statement: "The seconds the group has spent are read while the run is going.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every process in the group is ended at once where those seconds go past the ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "The group is taken away once the run is over whatever the run said.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling raises no limit.",
    },
    {
      invariantKind: "constraint",
      statement: "A machine delegating no processor time bounds no run.",
    },
    {
      invariantKind: "constraint",
      statement: "A run on a machine delegating no processor time is not refused.",
    },
    {
      invariantKind: "gap",
      statement: "A run on such a machine is caught by the seconds answered rather than bounded.",
    },
    {
      invariantKind: "departure",
      statement: "A run inside a run states a ceiling of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A process given no ceiling runs to its own end.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run is relayed only where a run made here is measured to cost more seconds than a run should.",
    },
    {
      invariantKind: "departure",
      statement: "The first run made here is the run measured.",
    },
    {
      invariantKind: "departure",
      statement: "A run under a ceiling is never the run measured.",
    },
    {
      invariantKind: "departure",
      statement: "A relay that will not start leaves every run to be made here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relayed run goes to a server outliving the run but not the process that started the server.",
    },
    {
      invariantKind: "absence",
      statement: "No process started here is meant to outlive its starter.",
    },
  ],
} as const satisfies Module
