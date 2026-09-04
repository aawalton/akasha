import type { Module } from "@akasha/code-system/module"

export const gpsLibState = {
  id: "01a0614d-4763-71d6-823d-0a023d0ff5b6",
  pageTypeSlug: "module",
  slug: "gps-lib-state",
  definition: "the library object and the state every other part of it reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The logger and the chat channel are made as this module loads.",
    },
    {
      invariantKind: "constraint",
      statement: "LibDebugLogger and LibChatMessage are loaded before this library.",
    },
  ],
} as const satisfies Module
