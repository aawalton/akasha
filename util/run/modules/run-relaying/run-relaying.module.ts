import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const runRelaying = {
  id: "01a082e2-3a67-77bb-9aa8-5b6fa40f30c5",
  type: "module",
  slug: "run-relaying",
  definition: "a run asked of a long-lived server over a pipe, and the answer read back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One server answers every run this process relays.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The server is started at the first run relayed rather than before that run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request goes over one pipe and an answer comes back over another pipe.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both pipes are made at once with their ends already closed on exec.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The C library those pipes are made through is the library already mapped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A server inheriting the write end this process keeps would never read an end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The server reads requests as its input and writes answers as its output.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A frame is a JSON head and two runs of bytes each preceded by its own length.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write goes on until every byte is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read goes on until every byte asked for has arrived.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read ending early raises rather than being answered as a frame that arrived.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing on the way to an answer is awaited.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A lost channel is answered as no code and no signal and no bytes and why the channel was lost.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Both ends of a lost channel are closed and the server behind that channel is forgotten.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The run after a lost channel starts a server of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A throw the server sends back is raised again in the caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That throw says the run the server was sent may already have been made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may open the channel without sending a run over it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seconds every relayed run burned are kept for this process to read back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relayed run burns those seconds in the server rather than in a reaped child.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller counting the seconds a run spawned reads those seconds here as well as from the kernel.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run the server threw on counts the seconds that run burned before throwing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ceilings a run was given go over to the server with that run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The peak memory a relayed run reached comes back with that run's answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether that peak was measured comes back with it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run the server threw on is answered as having reached no peak.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a run is answered as having had no peak measured.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A lost channel is answered as having reached no peak.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A lost channel is answered as having had no peak measured.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A lost channel that was told no seconds adds no seconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The output stream is bytes the whole way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The error stream is text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An environment entry stated as undefined goes over as a pair rather than being dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The server is started with a mark in the environment naming the server.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A process with that mark in its own environment starts no server.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here builds a command from the path of the file asking for the run.",
    },
  ],
} as const satisfies Module
