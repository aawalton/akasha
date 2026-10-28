import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherExportKeybindings = {
  id: "01a18484-6a6d-73f0-a619-ad75b28b2fbc",
  type: "page-type/module",
  slug: "watcher-export-keybindings",
  definition: "Alan's keybinding pages, worked out as the block Temper's core config holds them in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every keybinding page is read in one read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The keybindings go into TemperConfig beside the HUD layout, as the keybinder is Temper core's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A keybinding page the shape refuses stops the export and leaves the config as it is.",
    },
  ],
  createdAt: "2026-10-28T21:57:12.940Z",
  updatedAt: "2026-10-28T21:57:12.940Z",
} as const satisfies Module
