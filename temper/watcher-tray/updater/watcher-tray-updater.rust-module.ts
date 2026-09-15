import type { RustModule } from "akasha/code/rust-module/rust-module.page-type.types.ts"

export const watcherTrayUpdater = {
  id: "01a06034-87f3-7066-9d50-14fe57f95672",
  type: "page-type/rust-module",
  slug: "watcher-tray-updater",
  definition: "how the tray replaces its own executable from the server",
  rust: "rs",
  moduleName: "updater",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A replacement is triggered where the server's version differs from the built version.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The running executable is renamed aside before the downloaded executable takes that name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The renamed old executable is deleted at the next start.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A replaced tray waits for the next login rather than restarting itself.",
    },
  ],
} as const satisfies RustModule
