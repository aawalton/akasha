import type { Module } from "@akasha/code-system/module"

export const mapPingHandlerState = {
  id: "01a0605f-6262-75fe-be54-df973258bb60",
  pageTypeSlug: "module",
  slug: "map-ping-handler-state",
  definition: "the mute, suppress and ping state one map ping key carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count below zero is clamped to zero.",
    },
    {
      invariantKind: "departure",
      statement: "A ping state read for the first time is taken from the game.",
    },
  ],
} as const satisfies Module
