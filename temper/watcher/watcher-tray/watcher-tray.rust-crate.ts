import type { RustCrate } from "akasha/code/rust-crate/rust-crate.page-type.types.ts"

export const watcherTray = {
  id: "01a06034-87f1-70ce-9bb8-126ea33109ad",
  type: "page-type/rust-crate",
  slug: "watcher-tray",
  definition: "the Windows tray program keeping Temper's SavedVariables worker running",
  cargoManifest: "toml",
  cargoBuildScript: "rs",
  gitIgnore: "gitignore",
  icon: "json",
  modules: [
    "rust-module/watcher-tray-installer",
    "rust-module/watcher-tray-logger",
    "rust-module/watcher-tray-main",
    "rust-module/watcher-tray-supervisor",
    "rust-module/watcher-tray-tray",
    "rust-module/watcher-tray-updater",
  ],
  parts: [
    "rust-module/watcher-tray-installer",
    "rust-module/watcher-tray-logger",
    "rust-module/watcher-tray-main",
    "rust-module/watcher-tray-supervisor",
    "rust-module/watcher-tray-tray",
    "rust-module/watcher-tray-updater",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The binary Cargo builds is named `temper-watcher` rather than named for the crate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The version the tray reports itself as is fixed when the tray is built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The server the tray reaches is fixed when the tray is built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release build opens no console window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every dependency is drawn from crates.io rather than from this repository.",
    },
  ],
} as const satisfies RustCrate
