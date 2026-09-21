import type { RustModule } from "akasha/code/rust-module/rust-module.page-type.types.ts"

export const watcherTrayLogger = {
  id: "01a06034-87f3-7e8f-8172-3c3603e9bb0c",
  type: "page-type/rust-module",
  slug: "watcher-tray-logger",
  definition: "the rotating log file the tray writes its lines to",
  rust: "rs",
  moduleName: "logger",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A log line has an instant and a level before the message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The live log is rotated once that log reaches a megabyte.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Three log files are kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A log that could not be written is dropped rather than thrown on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The instant is worked out here rather than drawn from a date library.",
    },
  ],
} as const satisfies RustModule
