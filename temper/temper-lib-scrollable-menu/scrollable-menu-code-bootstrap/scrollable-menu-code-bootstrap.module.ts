import type { Module } from "@akasha/code-system/module"

export const scrollableMenuCodeBootstrap = {
  id: "01a06275-c444-774f-83a6-cfdd9fd1d702",
  pageTypeSlug: "module",
  slug: "scrollable-menu-code-bootstrap",
  definition: "the addon-loaded hook and the XML handlers the row templates call into",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Saved variables are created only once the addon-loaded event fires.",
    },
    {
      invariantKind: "departure",
      statement: "Scene changes and ZO_Menu openings are hooked to close any open library menu.",
    },
    {
      invariantKind: "departure",
      statement: "Two slash commands are registered for the debug toggles.",
    },
    {
      invariantKind: "departure",
      statement: "An XML handler resolves its target through the control's owning window.",
    },
  ],
} as const satisfies Module
