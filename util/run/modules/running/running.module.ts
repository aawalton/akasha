import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const running = {
  id: "01a05d20-8007-70bf-8ed6-29cc7dfb4687",
  type: "module",
  slug: "running",
  definition: "a process run to its end, and the code and streams it leaves",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process is named by a list with the command and its arguments.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each stream a process says on is taken whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A code other than zero is answered as data.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process ending on a signal is answered as `-1` and the name of that signal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process ending on a code of its own is answered as naming no signal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How a process ended is spelled once here as a code or as a signal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A throw says how the process ended rather than a code alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller wanting a throw asks for the streams rather than how the process ran.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process inherits the environment of its caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An environment stated replaces the environment inherited.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process's output stream is answered as bytes where bytes are asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text is those bytes read as text rather than a second run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process is answered with the processor seconds that process spent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process is answered with the peak memory that process reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That peak is the highest everything in the process's group ever held at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The group's peak is read once the process ended and before the group is taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller is answered whether the peak answered was measured.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process run in no group is answered as having reached no peak.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a process is answered as having had no peak measured.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process is answered the seconds every process in that process's group spent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Those seconds carry a child the run never reaped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seconds answered leave out what was spent before the run joined its group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A bounded process is answered the seconds its ceiling is judged against.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A process run in no group is answered the seconds that process and its reaped children spent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The group's seconds are read before the group is taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A process the kernel reported no usage for is answered as having spent no seconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may give a process a ceiling in processor seconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process ended at its ceiling is answered as having died on a signal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ceiling bounds a process together with everything that process starts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may give a process a ceiling in megabytes of memory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process at its memory ceiling is reclaimed and slowed rather than ended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A memory ceiling is stated on the group before the run joins that group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run given no memory ceiling is held to none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every process run here runs in a control group made for that one run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The run sits in a leaf of that group, and what the run starts sits beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a run spent and held is read from that group rather than from the leaf.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run started inside a run makes its group under that run's group.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A memory ceiling on a group above a run bounds the peak that run is answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That group is made under the nearest ancestor group this run may write in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An ancestor group is written in only where processor time and memory are delegated to that group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A group left where the run that made it is gone is taken away before a group is made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group left is known by the run that made it being named in the group's name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Groups left are looked for in the group this process makes its own groups in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group left is taken away with every group inside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every process still in a group left is ended before that group is taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A group whose name names a process now running outside the group's parent is a group left.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A group this process sits in is never taken away as left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group under a container's group is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No group another container made is ever taken away as left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A group that cannot be taken away once its run is over is said aloud on the error stream.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group left goes at the next group made beside it or at the reaper's next tick.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The program a process is named by is looked for on the path before the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program found is run by the path that found it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program found nowhere is run in no group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seconds a bounded process's group has spent are read while the run is going.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every process in the group is ended at once where those seconds go past the ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The group is taken away once the run is over whatever the run said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ceiling raises no limit.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing ends a process whose caller stated no ceiling.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A machine delegating processor time and memory nowhere bounds no run.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A run on such a machine is not refused.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A run on such a machine is caught by the seconds answered rather than bounded.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A run on such a machine has no peak measured.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run inside a run states a ceiling of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process given no ceiling runs to its own end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run is relayed only where a run made here is measured to cost more seconds than a run should.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first run made here is the run measured.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run under a ceiling is never the run measured.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relay that will not start leaves every run to be made here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether the relay will start is settled before a run is sent rather than after.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A run the relay answered on is never made a second time here.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A raise the relay sends back says nothing of whether the run was made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A relayed run goes to a server outliving the run but not the process that started the server.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No process started here is meant to outlive its starter.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The process running here may be held to a memory ceiling of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process held here sits in a leaf of the group made for that hold.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The memory ceiling of a hold is stated on that leaf.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hold answers a way to let the process go.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Letting go moves the process back to the group it was held out of.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Letting go takes away the group the hold made.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A process is held only where the group it came from would take that process back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hold that could not be made answers a letting go that does nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing raises where a process cannot be held.",
    },
  ],
} as const satisfies Module
