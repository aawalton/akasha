import type { RustModule } from "akasha/code/rust-module/rust-module.page-type.types.ts"

export const watcherTrayMain = {
  id: "01a06034-87f2-7fac-8b9d-cf99a6a41d3b",
  type: "page-type/rust-module",
  slug: "watcher-tray-main",
  definition: "where the tray program's run begins",
  rust: "rs",
  moduleName: "main",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tray declares every sibling module here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tray that replaced itself exits rather than carrying on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step that failed is logged and the run carries on.",
    },
  ],
} as const satisfies RustModule
