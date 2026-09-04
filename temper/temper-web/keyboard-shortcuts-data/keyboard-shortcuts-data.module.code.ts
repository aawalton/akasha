interface KeyCombo {
  mac: readonly string[]
  win: readonly string[]
}

interface ShortcutEntry {
  description: string
  keys: readonly KeyCombo[]
}

interface ShortcutGroup {
  title: string
  shortcuts: readonly ShortcutEntry[]
}

export const SHORTCUT_GROUPS = [
  {
    title: "Global",
    shortcuts: [
      {
        description: "Toggle expand/collapse all",
        keys: [{ mac: ["⌘", "⌥", "T"], win: ["Ctrl", "Alt", "T"] }],
      },
    ],
  },
  {
    title: "Completion",
    shortcuts: [
      {
        description: "Toggle activity mode",
        keys: [{ mac: ["⌘", "⌥", "A"], win: ["Ctrl", "Alt", "A"] }],
      },
    ],
  },
] satisfies ShortcutGroup[]
