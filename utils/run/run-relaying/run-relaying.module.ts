import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const runRelaying = {
  id: "01a082e2-3a67-77bb-9aa8-5b6fa40f30c5",
  pageTypeSlug: "module",
  type: "module",
  slug: "run-relaying",
  definition: "a run asked of a long-lived server over a pipe, and the answer read back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One server answers every run this process relays.",
    },
    {
      invariantKind: "departure",
      statement: "The server is started at the first run relayed rather than before that run.",
    },
    {
      invariantKind: "departure",
      statement: "A request goes over one pipe and an answer comes back over another pipe.",
    },
    {
      invariantKind: "departure",
      statement: "Both pipes are made at once with their ends already closed on exec.",
    },
    {
      invariantKind: "departure",
      statement: "The C library those pipes are made through is the library already mapped.",
    },
    {
      invariantKind: "departure",
      statement: "A server inheriting the write end this process keeps would never read an end.",
    },
    {
      invariantKind: "departure",
      statement: "The server reads requests as its input and writes answers as its output.",
    },
    {
      invariantKind: "departure",
      statement: "A frame is a JSON head and two runs of bytes each preceded by its own length.",
    },
    {
      invariantKind: "departure",
      statement: "A write goes on until every byte is written.",
    },
    {
      invariantKind: "departure",
      statement: "A read goes on until every byte asked for has arrived.",
    },
    {
      invariantKind: "departure",
      statement: "A read ending early raises rather than being answered as a frame that arrived.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing on the way to an answer is awaited.",
    },
    {
      invariantKind: "departure",
      statement:
        "A lost channel is answered as no code and no signal and no bytes and why the channel was lost.",
    },
    {
      invariantKind: "departure",
      statement:
        "Both ends of a lost channel are closed and the server behind that channel is forgotten.",
    },
    {
      invariantKind: "departure",
      statement: "The run after a lost channel starts a server of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A throw the server sends back is raised again in the caller.",
    },
    {
      invariantKind: "departure",
      statement: "The seconds every relayed run burned are kept for this process to read back.",
    },
    {
      invariantKind: "departure",
      statement: "A relayed run burns those seconds in the server rather than in a reaped child.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller counting the seconds a run spawned reads those seconds here as well as from the kernel.",
    },
    {
      invariantKind: "departure",
      statement: "A run the server threw on counts the seconds that run burned before throwing.",
    },
    {
      invariantKind: "absence",
      statement: "A lost channel that was told no seconds adds no seconds.",
    },
    {
      invariantKind: "departure",
      statement: "The output stream is bytes the whole way.",
    },
    {
      invariantKind: "departure",
      statement: "The error stream is text.",
    },
    {
      invariantKind: "departure",
      statement:
        "An environment entry stated as undefined goes over as a pair rather than being dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The server is started with a mark in the environment naming the server.",
    },
    {
      invariantKind: "constraint",
      statement: "A process with that mark in its own environment starts no server.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds a command from the path of the file asking for the run.",
    },
  ],
} as const satisfies Module
