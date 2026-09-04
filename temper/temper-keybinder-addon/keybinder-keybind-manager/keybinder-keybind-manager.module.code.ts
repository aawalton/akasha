const [resolved] = assert(
  KEYBOARD_KEYBINDING_MANAGER ?? KEYBINDING_MANAGER,
  "TemperKeybinder: KEYBINDING_MANAGER not found"
)

export const KEYBIND_MANAGER: KeybindingManager = resolved
