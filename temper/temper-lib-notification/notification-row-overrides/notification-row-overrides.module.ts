import type { Module } from "@akasha/code-system/module"

export const notificationRowOverrides = {
  id: "01a0605a-0516-7cdb-bc72-cc68da9f4ab1",
  pageTypeSlug: "module",
  slug: "notification-row-overrides",
  definition: "the game's own notification row setup replaced so a row may carry its own look",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row lacking an icon falls back to the icon the game gives the row's type.",
    },
    {
      invariantKind: "departure",
      statement: "A row lacking a heading falls back to the heading the game gives the row's type.",
    },
    {
      invariantKind: "departure",
      statement: "An icon may be a texture path or a function answering a texture path.",
    },
    {
      invariantKind: "departure",
      statement: "The keyboard row setup is replaced only where the keyboard panel is loaded.",
    },
  ],
} as const satisfies Module
