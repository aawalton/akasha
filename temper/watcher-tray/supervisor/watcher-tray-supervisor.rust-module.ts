import type { RustModule } from "akasha/code/rust-modules/rust-module.page-type.types.ts"

export const watcherTraySupervisor = {
  id: "01a06034-87f3-7170-a8fa-a5f3354324b8",
  type: "rust-module",
  slug: "watcher-tray-supervisor",
  definition: "the worker process the tray spawns and spawns again",
  rust: "rs",
  moduleName: "supervisor",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A worker that exited on its own is spawned again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A worker the tray killed is left dead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker is looked at every five hundred milliseconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker runs with no console window of its own.",
    },
  ],
} as const satisfies RustModule
