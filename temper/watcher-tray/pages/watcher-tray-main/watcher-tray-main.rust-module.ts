import type { RustModule } from "../../../../code-system/rust-modules/rust-module.page-type.ts"

export const watcherTrayMain = {
  id: "01a06034-87f2-7fac-8b9d-cf99a6a41d3b",
  pageTypeSlug: "rust-module",
  slug: "watcher-tray-main",
  definition: "where the tray program's run begins",
  rust: "rs",
  moduleName: "main",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tray declares every sibling module here.",
    },
    {
      invariantKind: "departure",
      statement: "A tray that replaced itself exits rather than carrying on.",
    },
    {
      invariantKind: "departure",
      statement: "A step that failed is logged and the run carries on.",
    },
  ],
} as const satisfies RustModule
