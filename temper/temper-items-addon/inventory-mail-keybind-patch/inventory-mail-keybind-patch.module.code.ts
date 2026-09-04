const TARGET_KEYBIND = "UI_SHORTCUT_HELP"

let patched = false

export function buildSafeName(
  originalName: MailKeybindDescriptor["name"]
): ((this: void, descriptor: MailKeybindDescriptor) => string) | undefined {
  if (typeof originalName !== "function") return undefined
  const nameFn = originalName
  return function (this: void, descriptor: MailKeybindDescriptor): string {
    const result = nameFn(descriptor)
    return typeof result === "string" ? result : ""
  }
}

export function patchMailKeybindName(this: void): undefined {
  if (patched) return
  const descriptors = MAIL_INBOX?.selectionKeybindStripDescriptor
  if (descriptors === undefined) return
  for (const descriptor of descriptors) {
    if (descriptor.keybind !== TARGET_KEYBIND) continue
    const safeName = buildSafeName(descriptor.name)
    if (safeName === undefined) return
    descriptor.name = safeName
    patched = true
    return
  }
}
