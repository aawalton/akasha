import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperSavedVarsMigration = {
  id: "01a06072-5abb-776e-b9a1-6393d03e042b",
  type: "page-type/domain",
  slug: "temper-saved-vars-migration",
  definition: "carrying a player's saved variables over when addons are renamed or folded together",
  parts: [
    "module/bundle-member-saved-vars",
    "module/eso-running",
    "module/saved-vars-blocks",
    "module/saved-vars-migration",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game writes a player's saved variables as a Lua file of global assignments.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game deletes a saved variables file once no addon claims that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A migration runs before the game next loads rather than inside the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A migration runs only while the game is closed.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A running game writes its saved variables over any file a migration wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A migration that already ran is never run twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file about to be overwritten is copied aside first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copy aside is made once rather than on every run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A migration writes a whole file beside the old and renames it into place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reader of a saved variables file never sees a file half written by a migration.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here deletes the file a migration read from.",
    },
  ],
  createdAt: "2026-09-02T04:48:22.203Z",
  updatedAt: "2026-10-10T14:35:58.089Z",
} as const satisfies Domain
