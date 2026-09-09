import type { RustModule } from "../../../../code-system/rust-modules/rust-module.page-type.ts"

export const watcherTrayInstaller = {
  id: "01a06034-87f4-7908-a23a-069bdb5b09be",
  pageTypeSlug: "rust-module",
  slug: "watcher-tray-installer",
  definition: "what the tray puts in place on a machine before it runs",
  rust: "rs",
  moduleName: "installer",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A worker already on disk is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A worker download lands under a temporary name before the rename into place.",
    },
    {
      invariantKind: "departure",
      statement: "The startup shortcut is written by PowerShell rather than by Rust.",
    },
    {
      invariantKind: "departure",
      statement: "A startup shortcut already there is left alone.",
    },
  ],
} as const satisfies RustModule
