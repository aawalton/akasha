import { keyboardShortcutsDataCompletion } from "akasha/temper/web/phrase/pages/keyboard-shortcuts-data-completion.temper-web-phrase.ts"
import { keyboardShortcutsDataGlobal } from "akasha/temper/web/phrase/pages/keyboard-shortcuts-data-global.temper-web-phrase.ts"
import { keyboardShortcutsDataToggleActivityMode } from "akasha/temper/web/phrase/pages/keyboard-shortcuts-data-toggle-activity-mode.temper-web-phrase.ts"
import { keyboardShortcutsDataToggleExpandAll } from "akasha/temper/web/phrase/pages/keyboard-shortcuts-data-toggle-expand-all.temper-web-phrase.ts"

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

export const SHORTCUT_GROUPS: readonly ShortcutGroup[] = [
  {
    title: keyboardShortcutsDataGlobal.slug,
    shortcuts: [
      {
        description: keyboardShortcutsDataToggleExpandAll.slug,
        keys: [{ mac: ["⌘", "⌥", "T"], win: ["Ctrl", "Alt", "T"] }],
      },
    ],
  },
  {
    title: keyboardShortcutsDataCompletion.slug,
    shortcuts: [
      {
        description: keyboardShortcutsDataToggleActivityMode.slug,
        keys: [{ mac: ["⌘", "⌥", "A"], win: ["Ctrl", "Alt", "A"] }],
      },
    ],
  },
]
