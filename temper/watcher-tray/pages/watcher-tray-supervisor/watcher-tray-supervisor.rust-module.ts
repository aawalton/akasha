import type { RustModule } from "../../../../code-system/rust-modules/rust-module.page-type.ts"

export const watcherTraySupervisor = {
  id: "01a06034-87f3-7170-a8fa-a5f3354324b8",
  pageTypeSlug: "rust-module",
  slug: "watcher-tray-supervisor",
  definition: "the worker process the tray spawns and spawns again",
  rust: "rs",
  moduleName: "supervisor",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A worker that exited on its own is spawned again.",
    },
    {
      invariantKind: "departure",
      statement: "A worker the tray killed is left dead.",
    },
    {
      invariantKind: "departure",
      statement: "The worker is looked at every five hundred milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "The worker runs with no console window of its own.",
    },
  ],
} as const satisfies RustModule
