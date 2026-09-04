import type { Module } from "../../code-system/modules/module.page-type.ts"

export const portHolding = {
  id: "01a0659d-b1ba-7000-ac0a-6643010ea000",
  pageTypeSlug: "module",
  slug: "port-holding",
  definition: "the processes listening on a TCP port, found by socket inode under `/proc`",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Both the IPv4 and the IPv6 tables are read.",
    },
    {
      invariantKind: "departure",
      statement: "Only a socket in the listening state counts.",
    },
    {
      invariantKind: "departure",
      statement: "A port is matched as the four-digit hexadecimal the kernel writes.",
    },
    {
      invariantKind: "departure",
      statement: "A table that will not open reads as empty rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A process whose descriptors will not open is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A process holding two matching sockets is named once.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here signals a process.",
    },
  ],
} as const satisfies Module
