import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const movableWindow = {
  id: "01a060c4-17d0-7920-84d6-6391a39d187e",
  type: "module",
  slug: "movable-window",
  definition: "a game window the player drags by a handle, kept where the player left it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window here is drawn by the game rather than by the browser.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where a window is kept is the caller's concern rather than this package's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Dragging the handle moves the whole window.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window is clamped to the screen so no drag puts the window out of reach.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The position is handed to the caller each time a drag ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window with no saved position falls back to the caller's default anchor.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A saved position is anchored from the top left of the game's root.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No position is kept here.",
    },
  ],
} as const satisfies Module
