import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperUpstreamData = {
  id: "01a06038-2cbe-79d6-9497-4ef8b26650e5",
  type: "domain",
  slug: "temper-upstream-data",
  definition: "the data temper copies out of community ESO libraries and rules on afterwards",
  parts: [
    "module/leaf-dump",
    "module/libsets-data-port",
    "module/libsets-upstream-fetch",
    "module/libsets-upstream-pin",
    "module/libsets-upstream-verify",
    "module/map-data-upstream-port",
    "module/treasure-upstream-port",
    "module/ts-lua-serializer",
    "module/upstream-leaf-reading",
    "module/upstream-libraries",
    "module/housing-upstream-port",
    "module/zone-eso-stubs",
    "module/housing-upstream-verify",
    "module/map-data-upstream-verify",
    "module/treasure-upstream-verify",
    "module/zone-upstream-port",
    "module/zone-upstream-verify",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An upstream library's data is copied into this repository rather than read live.",
    },
    {
      invariantKind: "departure",
      statement: "A copy is ruled on against the upstream files a live ESO install has.",
    },
    {
      invariantKind: "departure",
      statement: "An upstream Lua file is read by running the file in a Lua machine.",
    },
    {
      invariantKind: "departure",
      statement: "A copy is ruled on leaf for leaf rather than by a digest or a count.",
    },
    {
      invariantKind: "departure",
      statement:
        "A ruling is refused where the upstream files that ruling reads are not on this workstation.",
    },
    {
      invariantKind: "departure",
      statement: "A library is ported by the one module named for that library.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout the ported file lands in is named by the caller.",
    },
  ],
} as const satisfies Domain
