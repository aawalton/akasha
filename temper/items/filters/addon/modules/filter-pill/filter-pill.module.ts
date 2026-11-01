import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const filterPill = {
  id: "01a19928-9ef1-7483-b152-b569866dd355",
  type: "page-type/module",
  slug: "filter-pill",
  definition: "the flat rounded chip a filter's control is shown as in the game",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sizes follow the website's filter popover and its chips.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pill text is the game's body color, and a filter's name is its heading color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pill's fill is a faint light wash over the panel, and stronger under the pointer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pill is a rounded fill with its text, and a chevron after it where it opens a menu.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pill is as wide as its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pill opening a menu is the game's own dropdown with its frame, text and arrow hidden.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A corner is rounded by stacking flat rectangles, since no rounded texture ships.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pill the player can press lightens while the pointer is over it.",
    },
  ],
  createdAt: "2026-11-01T22:08:58.608Z",
  updatedAt: "2026-11-01T23:35:29.308Z",
} as const satisfies Module
