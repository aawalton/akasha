import type { Module } from "@akasha/code-system/module"

export const zoneUpstreamPort = {
  id: "01a0685a-f9b2-7000-8097-747bc58d26f6",
  pageTypeSlug: "module",
  slug: "zone-upstream-port",
  definition:
    "the zone names and zone geography upstream LibZone carries, copied out as TypeScript",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The upstream Lua file is read by running the file in a sandboxed Lua machine.",
    },
    {
      invariantKind: "departure",
      statement: "The machine is given the ESO stubs the upstream file calls before it is run.",
    },
    {
      invariantKind: "departure",
      statement: "The zone names and the zone geography are written as two files from one run.",
    },
    {
      invariantKind: "departure",
      statement: "A language's zone names hold that language's own keys rather than a fallback.",
    },
    {
      invariantKind: "departure",
      statement: "A run leaving a data table missing is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "The ported file names the upstream version the data came out of.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout the ported file lands in is named by the caller.",
    },
  ],
} as const satisfies Module
