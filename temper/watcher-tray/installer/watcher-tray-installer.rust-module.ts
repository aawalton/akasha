import type { RustModule } from "akasha/code/rust-module/rust-module.page-type.types.ts"

export const watcherTrayInstaller = {
  id: "01a06034-87f4-7908-a23a-069bdb5b09be",
  type: "page-type/rust-module",
  slug: "watcher-tray-installer",
  definition: "what the tray puts in place on a machine before it runs",
  rust: "rs",
  moduleName: "installer",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A worker already on disk is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A worker download lands under a temporary name before the rename into place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The startup shortcut is written by PowerShell rather than by Rust.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A startup shortcut already there is left alone.",
    },
  ],
} as const satisfies RustModule
