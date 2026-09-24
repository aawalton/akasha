import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperUpstreamData = {
  id: "01a06038-2cbe-79d6-9497-4ef8b26650e5",
  type: "page-type/domain",
  slug: "temper-upstream-data",
  definition: "the data temper copies out of community ESO libraries and rules on afterwards",
  parts: [
    "module/housing-upstream-port",
    "module/housing-upstream-verify",
    "module/leaf-dump",
    "module/map-data-upstream-port",
    "module/map-data-upstream-verify",
    "module/treasure-upstream-port",
    "module/treasure-upstream-verify",
    "module/ts-lua-serializer",
    "module/upstream-leaf-reading",
    "module/upstream-libraries",
    "module/zone-eso-stubs",
    "module/zone-upstream-port",
    "module/zone-upstream-verify",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An upstream library's data is copied into this repository rather than read live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copy is ruled on against the upstream files a live ESO install has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An upstream Lua file is read by running the file in a Lua machine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copy is ruled on leaf for leaf rather than by a digest or a count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A ruling is refused where the upstream files that ruling reads are not on this workstation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A library is ported by the one module named for that library.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout the ported file lands in is named by the caller.",
    },
  ],
} as const satisfies Domain
