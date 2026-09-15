import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const portHolding = {
  id: "01a0659d-b1ba-7000-ac0a-6643010ea000",
  type: "module",
  slug: "port-holding",
  definition: "the processes listening on a TCP port, found by socket inode under `/proc`",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both the IPv4 and the IPv6 tables are read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a socket in the listening state counts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A port is matched as the four-digit hexadecimal the kernel writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A table that will not open reads as empty rather than refusing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process whose descriptors will not open is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process with two matching sockets is named once.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here signals a process.",
    },
  ],
} as const satisfies Module
