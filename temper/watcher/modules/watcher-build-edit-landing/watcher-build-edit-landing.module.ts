import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherBuildEditLanding = {
  id: "01a198c6-d253-7789-95db-603d53bd5efb",
  type: "page-type/module",
  slug: "watcher-build-edit-landing",
  definition: "the builds saved and renamed in the game, written to their pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game holds one pending change for each build, keyed by the id it mints.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pending change names the version of the build it was made over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pending change lands where the build is still that version or last took that same change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pending change lands nothing where the build already holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pending change naming no build makes one, found again by the change's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build made in the game is a target build of the character it was saved on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build hash from the game is written as the character import writes one.",
    },
  ],
  createdAt: "2026-11-01T20:22:09.235Z",
  updatedAt: "2026-11-01T20:22:09.235Z",
} as const satisfies Module
