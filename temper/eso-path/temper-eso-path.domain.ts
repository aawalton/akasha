import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEsoPath = {
  id: "01a06050-639d-78c1-a9ff-c6579f3deebd",
  type: "page-type/domain",
  slug: "temper-eso-path",
  definition: "what a workstation has of the game and of the game's own sources",
  parts: [
    "module/eso-clone-stamp",
    "module/eso-paths",
    "module/eso-paths-resolve",
    "module/lua-files",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path here is worked out from the environment rather than from the directories on disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asking the disk settles which candidate the live directory is.",
    },
  ],
} as const satisfies Domain
